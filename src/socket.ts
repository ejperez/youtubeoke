import type { Server } from "socket.io";
import type VideoFileManager from "./VideoFileManager.js";

const registerSocketHandlers = (
  io: Server,
  videoFileManager: VideoFileManager,
) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", async ({ roomId }, callback) => {
      if (typeof roomId !== "string" || !/^\d{8}$/.test(roomId)) {
        callback?.({ ok: false, error: "A valid eight-digit room is required." });
        return;
      }

      const previousRoomId = socket.data.roomId as string | undefined;
      if (previousRoomId && previousRoomId !== roomId) {
        await socket.leave(previousRoomId);
      }

      await socket.join(roomId);
      socket.data.roomId = roomId;
      callback?.({ ok: true });
    });

    socket.on("sync-event", (data) => {
      const roomId = socket.data.roomId as string | undefined;
      if (!roomId) return;

      socket.to(roomId).emit("sync-event", data);

      switch (data.action) {
        case "request-add-to-queue":
          const video = videoFileManager.getVideo(data.payload.video.id);

          if (!video) return;

          socket.to(roomId).emit("sync-event", {
            action: "add-to-queue",
            payload: { video: { ...data.payload.video, ...video } },
          });
          break;
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("download-finished", ({ id }) => {
      console.log("Download finished:", id);
    });
  });
};

export default registerSocketHandlers;
