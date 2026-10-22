import { io } from "socket.io-client";
import { BACKEND_URL } from "./config";

const socket = io(BACKEND_URL);
let activeRoomId = null;
let joinedRoomId = null;

const requestRoomJoin = (roomId) =>
  new Promise((resolve, reject) => {
    socket.timeout(5000).emit("join-room", { roomId }, (timeoutError, result) => {
      if (timeoutError) {
        reject(new Error("Timed out while joining the player room."));
        return;
      }

      if (!result?.ok) {
        reject(new Error(result?.error || "The player room could not be joined."));
        return;
      }

      joinedRoomId = roomId;
      resolve();
    });
  });

socket.on("connect", () => {
  if (activeRoomId && joinedRoomId === activeRoomId) {
    requestRoomJoin(activeRoomId).catch((error) => {
      joinedRoomId = null;
      console.error("Unable to rejoin player room:", error);
    });
  }
});

const joinRoom = async (roomId) => {
  if (!/^\d{8}$/.test(roomId)) {
    throw new Error("A valid eight-digit player room is required.");
  }

  activeRoomId = roomId;
  if (joinedRoomId === roomId && socket.connected) return;

  if (!socket.connected) {
    await new Promise((resolve) => socket.once("connect", resolve));
  }

  await requestRoomJoin(roomId);
};

const emitEvent = (action, payload = {}) => {
  if (!activeRoomId || joinedRoomId !== activeRoomId) {
    throw new Error("Cannot send a sync event before joining a player room.");
  }

  socket.emit("sync-event", {
    action,
    payload,
  });
};

const getRoomId = () => {
  if (!activeRoomId || joinedRoomId !== activeRoomId) {
    throw new Error("Cannot access the player room before joining it.");
  }

  return activeRoomId;
};

export { socket, emitEvent, getRoomId, joinRoom };
