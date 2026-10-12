import { Outlet } from "react-router";
import Loader from "../components/Loader";
import RemoteLogo from "../components/RemoteLogo";
import RemoteNav from "../components/RemoteNav";
import RemoteSearchBar from "../components/RemoteSearchBar";
import useRemoteFaves from "../hooks/useRemoteFaves";
import useRemoteSync from "../hooks/useRemoteSync";

export default function Remote() {
  const { faves, addFave, isInFaves, removeFromFaves } = useRemoteFaves();
  const {
    playerIsPlaying,
    currentQueue,
    currentVideo,
    isQueueLoading,
    emitEvent,
  } = useRemoteSync();

  return (
    <>
      <header className="flex fixed top-0 z-1 w-full bg-black/50 py-1 px-2 gap-1">
        <RemoteLogo />
        <RemoteSearchBar />
        <RemoteNav {...{ faves, currentQueue, currentVideo }} />
      </header>

      <div className="mt-14">
        <Loader>
          <Outlet
            context={{
              playerIsPlaying,
              currentQueue,
              currentVideo,
              isQueueLoading,
              emitEvent,
              faves,
              addFave,
              isInFaves,
              removeFromFaves,
            }}
          />
        </Loader>
      </div>
    </>
  );
}
