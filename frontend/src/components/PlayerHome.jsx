import { QRCode } from "react-qr-code";
import { Link } from "react-router";

function AnimatedBackground() {
  return (
    <>
      <div
        className="fixed inset-y-0 -left-1/2 -right-1/2 -z-10 opacity-50
         bg-[linear-gradient(-60deg,#f20_50%,#000_50%)]
         animate-slide"
      ></div>
      <div
        className="fixed inset-y-0 -left-1/2 -right-1/2 -z-10 opacity-50
         bg-[linear-gradient(-60deg,#f20_50%,#000_50%)]
         animate-slide [animation-duration:2s]"
      ></div>
      <div
        className="fixed inset-y-0 -left-1/2 -right-1/2 -z-10 opacity-50
         bg-[linear-gradient(-60deg,#f20_50%,#000_50%)]
         animate-slide [animation-duration:3s]"
      ></div>
    </>
  );
}

export default function PlayerHome({ playerID, remoteLink }) {
  return (
    <div className="fixed flex flex-col h-full w-full justify-center items-center">
      <div className="z-2 text-center p-2">
        <h1 className="text-center font-heading lg:text-6xl md:text-5xl text-4xl">
          Welcome to Youtubeoke!
        </h1>
        <p className="mt-2">
          Get your vocal cords ready and scan the QR code below to search and
          play songs.
        </p>
        <p className="mt-8 flex justify-center">
          <Link
            to={remoteLink}
            target="_blank"
            title={`Click to open in a new tab (Player ID: ${playerID})`}
          >
            <QRCode className="p-2 rounded-xl bg-white" value={remoteLink} />
          </Link>
        </p>
      </div>

      <video
        className="absolute -top-25 w-auto min-w-full min-h-[120%] max-w-none opacity-60"
        autoPlay
        loop
        muted
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
