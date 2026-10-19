import { Router } from "express";
const createDownloadsRouter = (videoDownloadQueue, videoFileManager, io) => {
    const router = Router();
    router.post("/", (req, res) => {
        const { id, add_to_queue: addToQueue, } = req.body;
        if (!id)
            return res.status(400).json({ error: "id is required" });
        videoDownloadQueue
            .getQueue()
            .push({ id })
            .on("finish", async function () {
            io.emit("sync-event", {
                action: "download-finished",
                payload: { id },
            });
            await videoFileManager.scan();
            if (addToQueue) {
                const video = videoFileManager.getVideo(id);
                io.emit("sync-event", {
                    action: "add-to-queue",
                    payload: { video },
                });
            }
        })
            .on("failed", function (err) {
            io.emit("sync-event", {
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
//# sourceMappingURL=downloads.js.map