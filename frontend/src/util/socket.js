import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WS_URL || "http://localhost:3000", {
  path: import.meta.env.VITE_WS_PATH || "/socket.io",
});

const emitRemoteEvent = (socket, playerID, action, payload = {}) => {
  socket.emit("sync-event", {
    action: action,
    payload: { playerID: playerID, ...payload },
  });
};

export { socket, emitRemoteEvent };
