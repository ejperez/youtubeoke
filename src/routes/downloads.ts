import { Router } from "express";
import type { Server } from "socket.io";
import type VideoDownloadQueue from "../VideoDownloadQueue.js";
import type VideoFileManager from "../VideoFileManager.js";

const createDownloadsRouter = (
  videoDownloadQueue: VideoDownloadQueue,
  videoFileManager: VideoFileManager,
  io: Server,
) => {
  const router = Router();

  router.post("/", (req, res) => {
    const {
      id,
      add_to_queue: addToQueue,
      roomId,
    }: { id: string; add_to_queue?: boolean; roomId: string } = req.body;
    if (!id) return res.status(400).json({ error: "id is required" });
    if (typeof roomId !== "string" || !/^\d{8}$/.test(roomId)) {
      return res.status(400).json({ error: "A valid roomId is required" });
    }

    videoDownloadQueue
      .getQueue()
      .push({ id })
      .on("finish", async function () {
        io.to(roomId).emit("sync-event", {
          action: "download-finished",
          payload: { id },
        });

        await videoFileManager.scan();

        if (addToQueue) {
          const video = videoFileManager.getVideo(id);

          io.to(roomId).emit("sync-event", {
            action: "add-to-queue",
            payload: { video },
          });
        }
      })
      .on("failed", function (err) {
        io.to(roomId).emit("sync-event", {
          action: "download-failed",
          payload: { id },
        });

        console.error("Failure", err);
      });

    return res.status(202).json({
      message: "Download enqueued",
    });
  });

  return router;
};

export default createDownloadsRouter;
