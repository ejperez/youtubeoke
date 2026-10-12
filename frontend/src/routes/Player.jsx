import PlayerFrame from "../components/PlayerFrame";
import PlayerHome from "../components/PlayerHome";
import PlayerStatusBar from "../components/PlayerStatusBar";
import PlayerError from "../components/PlayerError";
import usePlayerId from "../hooks/usePlayerId";
import usePlayerQueue from "../hooks/usePlayerQueue";
import usePlayerSync from "../hooks/usePlayerSync";

export default function Player() {
  const playerID = usePlayerId();
  const {
    currentVideo,
    setCurrentVideo,
    queue,
    setQueue,
    hasError,
    setHasError,
    queueRef,
    currentVideoRef,
    playNextInQueue,
    handleOnError,
    handleSkip,
  } = usePlayerQueue();
  const { handleOnReady, handleStateChange } = usePlayerSync({
    playerID,
    queue,
    currentVideo,
    setCurrentVideo,
    setQueue,
    queueRef,
    currentVideoRef,
    setHasError,
  });
  const remoteLink = `${document.location.href}#/${playerID}/remote`;

  return (
    <div className="flex flex-col h-screen">
      <PlayerStatusBar
        currentVideo={currentVideo}
        queue={queue}
        remoteLink={remoteLink}
      />
      {hasError ? (
        <PlayerError video={currentVideo} onSkip={handleSkip} />
      ) : currentVideo ? (
        <>
          <PlayerFrame
            videoID={currentVideo.id}
            onEnd={playNextInQueue}
            onError={handleOnError}
            onReady={handleOnReady}
            onStateChange={handleStateChange}
          />
        </>
      ) : (
        <PlayerHome playerID={playerID} remoteLink={remoteLink} />
      )}
    </div>
  );
}
