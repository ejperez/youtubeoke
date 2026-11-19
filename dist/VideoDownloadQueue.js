import Queue from "better-queue";
class VideoDownloadQueue {
    downloader;
    queue;
    constructor(downloader) {
        this.downloader = downloader;
        this.queue = this.#createQueue();
    }
    getQueue() {
        return this.queue;
    }
    #createQueue() {
        return new Queue(async (input, cb) => {
            try {
                const { id } = input;
                console.log(`[Worker] Starting download: ${id}`);
                const output = await this.downloader.download({ id });
                cb(null, output);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                else {
                    console.error("An unexpected error occurred:", String(error));
                }
                cb(error);
            }
        }, {
            // Configuration options
            concurrent: 1,
            maxRetries: 1,
            retryDelay: 5000,
        });
    }
}
export default VideoDownloadQueue;
//# sourceMappingURL=VideoDownloadQueue.js.map