import { type SearchResult } from "youtube-search-api";
export declare const searchVideos: (query: string) => Promise<{
    items: {
        id: string;
        title: string;
        channel: string | undefined;
        image: any;
        length: any;
    }[];
    nextPage: {
        nextPageToken: string | null;
        nextPageContext: any;
    };
}>;
export declare const getNextSearchPage: (nextPage: SearchResult["nextPage"]) => Promise<{
    items: {
        id: string;
        title: string;
        channel: string | undefined;
        image: any;
        length: any;
    }[];
    nextPage: {
        nextPageToken: string | null;
        nextPageContext: any;
    };
}>;
//# sourceMappingURL=youtubeSearch.d.ts.map