import type { Downloader, VideoDownloaderInput } from "./types/Downloader.js";
declare class VideoDownloader implements Downloader {
    downloadDirectory: string;
    constructor(downloadDirectory: string, ffmpegDirectory?: string, binaryPath?: string);
    download(input: VideoDownloaderInput): Promise<{
        id: string;
        filePath: string;
    } | undefined>;
}
export default VideoDownloader;
//# sourceMappingURL=VideoDownloader.d.ts.map