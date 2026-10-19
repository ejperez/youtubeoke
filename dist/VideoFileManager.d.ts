export type VideoSortOrder = "title" | "createdAt";
export type VideoFile = {
    id: string;
    channelName: string;
    title: string;
};
export type VideoLocation = {
    id: string;
    filePath: string;
};
type StoredVideoFile = VideoFile & {
    filePath: string;
    createdAt: number;
};
type GetVideosParam = {
    perPage?: number;
    currentPage?: number;
    sortBy?: VideoSortOrder;
    search?: string;
};
declare class VideoFileManager {
    #private;
    readonly ready: Promise<void>;
    constructor(videoDirectory: string);
    getVideosMatchCount(): number;
    getVideos({ perPage, currentPage, sortBy, search, }?: GetVideosParam): VideoFile[];
    getVideo(id: string): StoredVideoFile | undefined;
    scan(): Promise<void>;
}
export default VideoFileManager;
//# sourceMappingURL=VideoFileManager.d.ts.map