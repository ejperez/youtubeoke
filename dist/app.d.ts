import http from "http";
import { Server } from "socket.io";
import type VideoDownloadQueue from "./VideoDownloadQueue.js";
import type VideoFileManager from "./VideoFileManager.js";
export declare const createApplication: (videoDownloadQueue: VideoDownloadQueue, videoFileManager: VideoFileManager) => {
    app: import("express-serve-static-core").Express;
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    io: Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
};
//# sourceMappingURL=app.d.ts.map