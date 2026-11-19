import { YtDlp } from "ytdlp-nodejs";
import { VIDEO_DIR_DELIMITER } from "./config.js";
const ytdlp = new YtDlp();
class VideoDownloader {
    downloadDirectory;
    constructor(downloadDirectory, ffmpegDirectory = "", binaryPath = "") {
        this.downloadDirectory = downloadDirectory;
        ytdlp.ffmpegPath = ffmpegDirectory;
        ytdlp.binaryPath = binaryPath;
    }
    async download(input) {
        const { id, quality = "720p" } = input;
        const result = await ytdlp
            .download(`https://youtube.com/watch?v=${id}`)
            .format({ filter: "mergevideo", quality, type: "mp4" })
            .output(`${this.downloadDirectory}/%(id)s${VIDEO_DIR_DELIMITER}%(channel)s`)
            .on("progress", (p) => console.log(`${p.percentage_str}`))
            .run();
        const filePath = result.filePaths[0];
        if (!filePath)
            return undefined;
        return {
            id,
            filePath,
        };
    }
}
export default VideoDownloader;
//# sourceMappingURL=VideoDownloader.js.map