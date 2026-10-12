import YouTube from "react-youtube";

export default function PlayerFrame({
  videoID,
  onError,
  onEnd,
  onReady,
  onStateChange,
}) {
  const opts = {
    height: "1280",
    width: "720",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      enablejsapi: 1,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      playsinline: 1,
      cc_load_policy: 3,
    },
  };

  return (
    <YouTube
      className="w-screen h-screen"
      videoId={videoID}
      opts={opts}
      iframeClassName="h-full w-full"
      onStateChange={(event) => {
        switch (event.data) {
          case 0:
            onEnd();
            break;
        }

        onStateChange();

        // Turn off subtitles by force
        if (typeof event.target.unloadModule === "function") {
          event.target.unloadModule("captions");
          event.target.unloadModule("cc");
        }
      }}
      onError={onError}
      onReady={onReady}
    />
  );
}
