import Queue from "better-queue";
import type { Downloader } from "./types/Downloader.js";
declare class VideoDownloadQueue {
    #private;
    downloader: Downloader;
    queue: Queue;
    constructor(downloader: Downloader);
    getQueue(): Queue<any, any>;
}
export default VideoDownloadQueue;
//# sourceMappingURL=VideoDownloadQueue.d.ts.map