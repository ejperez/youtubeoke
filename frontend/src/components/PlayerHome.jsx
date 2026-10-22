import { QRCode } from "react-qr-code";

export default function PlayerHome({ playerID, remoteLink }) {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center flex-1">
      <div className="z-2 text-center p-2">
        <h1 className="text-center lg:text-7xl md:text-5xl text-4xl font-heading">
          Welcome great singers!
        </h1>
        <p className="mt-2">
          Get your vocal cords ready and scan the QR code below to search and
          play songs.
        </p>
        <p className="mt-8 flex justify-center">
          <a
            href={remoteLink}
            target="_blank"
            title={`Click to open in a new tab (Player ID: ${playerID})`}
          >
            <QRCode className="p-2 rounded-xl bg-white" value={remoteLink} />
          </a>
        </p>
      </div>

      <video
        className="fixed -top-25 w-auto min-w-full min-h-[120%] max-w-none opacity-60"
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
