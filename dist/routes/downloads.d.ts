import type { Server } from "socket.io";
import type VideoDownloadQueue from "../VideoDownloadQueue.js";
import type VideoFileManager from "../VideoFileManager.js";
declare const createDownloadsRouter: (videoDownloadQueue: VideoDownloadQueue, videoFileManager: VideoFileManager, io: Server) => import("express-serve-static-core").Router;
export default createDownloadsRouter;
//# sourceMappingURL=downloads.d.ts.map