import PlayerHome from "./PlayerHome";
import PlayerStatusBar from "./PlayerStatusBar";
import usePlayer from "../hooks/usePlayer";
import PlayerScore from "./PlayerScore";
import PlayerFrame from "./PlayerFrame";
import PlayerError from "./PlayerError";
import { useState } from "react";

export default function Player() {
  const [roomId] = useState(() =>
    String(Math.floor(10_000_000 + Math.random() * 90_000_000)),
  );
  const {
    currentVideo,
    queue,
    videoPlayerRef,
    isShowingScore,
    hasError,
    playNextInQueue,
    setIsShowingScore,
    setHasError,
    handleSkip,
    broadcastPlayerStatus,
  } = usePlayer(roomId);
  const remoteUrl = new URL("remote", document.location.href);
  remoteUrl.searchParams.set("room", roomId);
  const remoteLink = remoteUrl.toString();

  return (
    <div className="flex flex-col h-screen">
      {isShowingScore ? (
        <PlayerScore callback={playNextInQueue} />
      ) : currentVideo ? (
        <>
          <PlayerStatusBar
            currentVideo={currentVideo}
            queue={queue}
            remoteLink={remoteLink}
          />

          {hasError ? (
            <PlayerError video={currentVideo} onSkip={handleSkip} />
          ) : (
            <div className="flex-1 overflow-hidden">
              <PlayerFrame
                {...{
                  currentVideo,
                  videoPlayerRef,
                  setIsShowingScore,
                  setHasError,
                  broadcastPlayerStatus,
                }}
              />
            </div>
          )}
        </>
      ) : (
        <PlayerHome playerID={roomId} remoteLink={remoteLink} />
      )}
    </div>
  );
}
