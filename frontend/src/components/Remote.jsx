import { useEffect, useState } from "react";
import useRemoteView from "../hooks/useRemoteView";
import RemoteNav from "./RemoteNav";
import RemoteSearch from "./RemoteSearch";
import RemoteSongBook from "./RemoteSongBook";
import RemoteQueue from "./RemoteQueue";
import { joinRoom } from "../util/socket";

export default function Remote() {
  const { currentView, setCurrentView, views } = useRemoteView();
  const roomId = new URLSearchParams(window.location.search).get("room");
  const [joinResult, setJoinResult] = useState(null);

  useEffect(() => {
    let isActive = true;

    if (!roomId || !/^\d{8}$/.test(roomId)) return;

    joinRoom(roomId)
      .then(() => {
        if (isActive) setJoinResult({ roomId, status: "joined" });
      })
      .catch((error) => {
        console.error("Unable to join player room:", error);
        if (isActive) setJoinResult({ roomId, status: "failed" });
      });

    return () => {
      isActive = false;
    };
  }, [roomId]);

  if (!roomId || !/^\d{8}$/.test(roomId)) {
    return (
      <div className="p-4" role="alert">
        This remote link is missing a valid player room.
      </div>
    );
  }

  const roomStatus =
    joinResult?.roomId === roomId ? joinResult.status : "joining";

  if (roomStatus !== "joined") {
    const message =
      roomStatus === "failed"
        ? "Unable to connect to this player. Please try again."
        : "Connecting to player...";

    return (
      <div className="p-4" role={roomStatus === "failed" ? "alert" : "status"}>
        {message}
      </div>
    );
  }

  return (
    <>
      <header>
        <RemoteNav
          {...{
            currentView,
            setCurrentView,
            views,
          }}
        />
      </header>

      <div className="mt-12">
        <RemoteSongBook isActive={currentView === "Song Book"} />
        <RemoteSearch isActive={currentView === "Search"} />
        <RemoteQueue isActive={currentView === "Queue"} />
      </div>
    </>
  );
}
