import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import ErrorComponent from "./components/ErrorComponent.jsx";
import { AnimatedMessage } from "./components/Loader.jsx";
import RemoteFaves from "./components/RemoteFaves.jsx";
import RemoteQueue from "./components/RemoteQueue.jsx";
import RemoteSearch from "./components/RemoteSearch.jsx";
import RemoteShare from "./components/RemoteShare.jsx";
import "./index.css";
import Player from "./routes/Player.jsx";
import Remote from "./routes/Remote.jsx";
import { remoteSearchLoader } from "./util/loaders.js";

const router = createHashRouter([
  {
    path: "/",
    element: <Player />,
  },
  {
    path: "/:playerID/remote",
    element: <Remote />,
    children: [
      {
        path: "/:playerID/remote",
        element: <RemoteFaves />,
      },
      {
        path: "/:playerID/remote/search",
        element: <RemoteSearch />,
        loader: remoteSearchLoader,
        hydrateFallbackElement: <AnimatedMessage />,
        errorElement: (
          <ErrorComponent message="There has been a server error. Please try again later." />
        ),
      },
      {
        path: "/:playerID/remote/queue",
        element: <RemoteQueue />,
      },
      {
        path: "/:playerID/remote/share",
        element: <RemoteShare />,
      },
    ],
  },
]);

const storageSupport = "localStorage" in window && "sessionStorage" in window;

if (storageSupport) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  alert("This app needs local and session storage features.");
}
