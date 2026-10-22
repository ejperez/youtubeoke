import { useState, useEffect } from "react";
import { getRoomId, socket } from "../util/socket";
import { BACKEND_URL } from "../util/config";

const BACKEND_API = BACKEND_URL + "/api/downloads";

export default function useRemoteDownloads() {
  const [latestDownloadedId, setLatestDownloadedId] = useState(null);
  const [latestFailedId, setLatestFailedId] = useState(null);

  // Handle sync events from server
  useEffect(() => {
    const handleSyncEvent = (data) => {
      console.log(data);

      switch (data.action) {
        case "download-finished":
          setLatestDownloadedId(data.payload.id);

          break;
        case "download-failed":
          setLatestFailedId(data.payload.id);

          break;
      }
    };

    socket.on("sync-event", handleSyncEvent);

    return () => {
      socket.off("sync-event", handleSyncEvent);
    };
  }, []);

  const download = async (id, addToQueue = false) => {
    const response = await fetch(BACKEND_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        add_to_queue: addToQueue,
        roomId: getRoomId(),
      }),
    });

    return await response.json();
  };

  return {
    download,
    latestDownloadedId,
    latestFailedId,
  };
}
