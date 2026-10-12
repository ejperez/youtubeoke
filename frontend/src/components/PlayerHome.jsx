import { QRCode } from "react-qr-code";
import { Link } from "react-router";

export default function PlayerHome({ playerID, remoteLink }) {
  const videoURL = `${import.meta.env.BASE_URL}video.mp4`;

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
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
