import { useCallback, useEffect, useRef, useState } from "react";
import { emitEvent, joinRoom, socket } from "../util/socket";
import { NO_DOWNLOADS } from "../util/config";

export default function usePlayer(roomId) {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [queue, setQueueState] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isShowingScore, setIsShowingScore] = useState(false);
  const setQueue = useCallback((nextQueue) => {
    setQueueState((currentQueue) => {
      const updatedQueue =
        typeof nextQueue === "function" ? nextQueue(currentQueue) : nextQueue;

      return updatedQueue.map((item, index) => ({ ...item, index }));
    });
  }, []);
  const queueRef = useRef(queue);
  const currentVideoRef = useRef(currentVideo);
  const videoPlayerRef = useRef(null);
  const roomJoinedRef = useRef(false);

  const playNextInQueue = () => {
    setIsShowingScore(false);

    if (queue.length > 0) {
      setCurrentVideo(queue[0]);
      setQueue((queue) => queue.slice(1));
    } else {
      setCurrentVideo(null);
    }
  };

  // Autoplay first item in queue if nothing is playing
  useEffect(() => {
    if (!currentVideo) {
      playNextInQueue();
    }
  }, [queue, currentVideo]);

  const broadcastQueue = () => {
    if (!roomJoinedRef.current) return;

    emitEvent("current-queue", {
      queue: queueRef.current,
      currentVideo: currentVideoRef.current,
    });
  };

  const isVideoPlayerPlaying = () => {
    if (NO_DOWNLOADS) {
      return (
        videoPlayerRef.current.getPlayerState() ===
        window.YT.PlayerState.PLAYING
      );
    }

    if (!videoPlayerRef.current) return false;

    return !videoPlayerRef.current.paused && !videoPlayerRef.current.ended;
  };

  const broadcastPlayerStatus = () => {
    if (!roomJoinedRef.current) return;

    emitEvent("player-status-changed", {
      isPlaying: isVideoPlayerPlaying(),
    });
  };

  useEffect(() => {
    queueRef.current = queue;
    currentVideoRef.current = currentVideo;
    broadcastQueue();
  }, [queue, currentVideo]);

  useEffect(() => {
    const handleSyncEvent = (data) => {
      console.log(data);

      switch (data.action) {
        case "play-video":
          setCurrentVideo(data.payload.video);
          break;
        case "add-to-queue": {
          setQueue((queue) => [...queue, data.payload.video]);
          break;
        }
        case "get-queue":
          broadcastQueue();
          break;
        case "remove-from-queue":
          setQueue((queue) =>
            queue.filter((item) => item.index !== data.payload.video.index),
          );
          break;
        case "restart-current-video":
          if (!videoPlayerRef.current) return;

          if (NO_DOWNLOADS) {
            videoPlayerRef.current.seekTo(0);
            videoPlayerRef.current.playVideo();
          } else {
            videoPlayerRef.current.currentTime = 0;
            videoPlayerRef.current.playVideo();
          }

          break;
        case "pause-current-video":
          if (!videoPlayerRef.current) return;

          if (NO_DOWNLOADS) {
            videoPlayerRef.current.pauseVideo();
          } else {
            videoPlayerRef.current.pause();
          }

          break;
        case "play-current-video":
          if (!videoPlayerRef.current) return;

          if (NO_DOWNLOADS) {
            videoPlayerRef.current.playVideo();
          } else {
            videoPlayerRef.current.play();
          }
          broadcastQueue();
          break;
        case "get-player-state":
          broadcastPlayerStatus();
          break;
      }
    };

    socket.on("sync-event", handleSyncEvent);

    return () => {
      socket.off("sync-event", handleSyncEvent);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    roomJoinedRef.current = false;

    joinRoom(roomId)
      .then(() => {
        if (!isActive) return;
        roomJoinedRef.current = true;
        broadcastQueue();
      })
      .catch((error) => {
        console.error("Unable to join player room:", error);
      });

    return () => {
      isActive = false;
      roomJoinedRef.current = false;
    };
  }, [roomId]);

  const handleSkip = () => {
    playNextInQueue();
    setHasError(false);
  };

  return {
    currentVideo,
    queue,
    videoPlayerRef,
    isShowingScore,
    hasError,
    setIsShowingScore,
    playNextInQueue,
    setHasError,
    handleSkip,
    broadcastPlayerStatus,
  };
}
