import { QRCode } from "react-qr-code";
import { useState } from "react";

export default function PlayerStatusBar({ currentVideo, queue, remoteLink }) {
  const [isQRShown, setIsQRShown] = useState(false);

  if (!currentVideo && queue.length === 0) return;

  return (
    <>
      <div className="top-0 flex z-50 gap-1 justify-between p-1 w-full text-sm items-center bg-black font-heading">
        {currentVideo && (
          <div className="truncate text-green-500">
            NOW PLAYING: {currentVideo.title}
          </div>
        )}
        {queue[0] && (
          <div className="truncate text-yellow-500">NEXT: {queue[0].title}</div>
        )}
        {queue.length > 0 && (
          <div className="flex shrink-0">
            <div className="pr-1 text-red-500">RESERVED: {queue.length}</div>
          </div>
        )}
        {currentVideo && (
          <div className="relative flex shrink-0">
            <button
              onClick={() => {
                setIsQRShown((isShown) => !isShown);
              }}
              className="text-xs border px-2 rounded-2xl w-18"
              type="button"
            >
              {isQRShown ? "Hide" : "Show"} QR
            </button>
            {isQRShown && (
              <div className="absolute right-0 top-6">
                <QRCode
                  className="p-0.5 size-28 bg-white rounded-xs"
                  value={remoteLink}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
