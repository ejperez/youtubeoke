import { useMemo, useState } from "react";
import useRuntimeConfig from "../util/useRuntimeConfig";

export default function useRemoteView() {
  const { noDownloads } = useRuntimeConfig();
  const views = useMemo(
    () =>
      noDownloads
        ? ["Search", "Queue"]
        : ["Song Book", "Search", "Queue"],
    [noDownloads],
  );
  const [currentView, setCurrentView] = useState(views[0]);

  return { currentView, setCurrentView, views };
}
