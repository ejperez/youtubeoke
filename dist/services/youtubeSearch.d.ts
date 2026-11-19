import { type SearchResult } from "youtube-search-api";
export type SearchResponseItem = {
    id: string;
    title: string;
    channel: string | undefined;
    image: string;
    length: string;
};
export type SearchResponse = {
    items: SearchResponseItem[];
    nextPage: {
        nextPageToken: string | null;
        nextPageContext: any;
    };
};
export declare const searchVideos: (query: string) => Promise<SearchResponse>;
export declare const getNextSearchPage: (nextPage: SearchResult["nextPage"]) => Promise<SearchResponse>;
//# sourceMappingURL=youtubeSearch.d.ts.map