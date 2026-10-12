import { Link, useParams } from "react-router";
import useRemoteView from "../hooks/useRemoteView";
import { cn } from "../util/util";

export default function RemoteNav({ faves, currentQueue, currentVideo }) {
  const { playerID } = useParams();
  const { currentView } = useRemoteView();
  const queueCount = currentQueue.length + (currentVideo ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <Link
        to={`/${playerID}/remote`}
        title="Click to see favorites"
        className={cn(
          "relative size-10 inline-block rounded-full border-2 p-1",
          {
            "bg-white text-black border-white": currentView === "faves",
          },
        )}
      >
        <div
          className={cn(
            "bg-white text-black absolute -right-1 -top-1 border-black border rounded-full text-[10px] font-bold px-1",
            {
              "bg-black text-white border-white": currentView === "faves",
            },
          )}
        >
          {faves.length}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={currentView === "faves" ? "#000" : "#FFF"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </Link>

      <Link
        to={`/${playerID}/remote/queue`}
        title="Click to see queue"
        className={cn(
          "relative size-10 inline-block rounded-full border-2 p-1",
          {
            "bg-white text-black border-white": currentView === "queue",
          },
        )}
      >
        <div
          className={cn(
            "bg-white text-black absolute -right-1 -top-1 border-black border rounded-full text-[10px] font-bold px-1",
            {
              "bg-black text-white border-white": currentView === "queue",
            },
          )}
        >
          {queueCount}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={currentView === "queue" ? "#000" : "#FFF"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="4" cy="6" r="1" />
          <circle cx="4" cy="12" r="1" />
          <circle cx="4" cy="18" r="1" />
        </svg>
      </Link>
    </div>
  );
}
