import youtubesearchapi, { type SearchResult } from "youtube-search-api";
import { BLOCKED_CHANNELS } from "../config.js";

const YT_ITEMS_PER_PAGE = 100;

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

const processResponse = (data: SearchResult): SearchResponse => ({
  items: data.items
    .filter((item) => item.type === "video")
    .filter((item) => !BLOCKED_CHANNELS.includes(item.channelTitle || ""))
    .map((item) => {
      return {
        id: item.id,
        title: item.title,
        channel: item.channelTitle,
        image: item.thumbnail.thumbnails.shift()?.url,
        length: item.length.simpleText,
      };
    }),
  nextPage: data.nextPage,
});

export const searchVideos = async (query: string) => {
  const data = await youtubesearchapi.GetListByKeyword(
    query,
    false,
    YT_ITEMS_PER_PAGE,
    [{ type: "video" }],
  );

  return processResponse(data);
};

export const getNextSearchPage = async (nextPage: SearchResult["nextPage"]) => {
  const data = await youtubesearchapi.NextPage(
    nextPage,
    false,
    YT_ITEMS_PER_PAGE,
  );

  return processResponse(data);
};
