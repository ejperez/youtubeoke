import { useEffect, useState } from "react";
import { BACKEND_URL } from "./config";
import { RuntimeConfigContext } from "./runtimeConfigContext";

export function RuntimeConfigProvider({ children }) {
  const [retryCount, setRetryCount] = useState(0);
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${BACKEND_URL}/api/config`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Configuration request failed (${response.status}).`);
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data.noDownloads !== "boolean") {
          throw new Error("The server returned invalid runtime configuration.");
        }
        setConfig({ noDownloads: data.noDownloads });
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      });

    return () => controller.abort();
  }, [retryCount]);

  if (error) {
    return (
      <div className="p-4" role="alert">
        <p>Unable to load app configuration: {error}</p>
        <button
          className="mt-2 rounded border px-3 py-1"
          type="button"
          onClick={() => {
            setConfig(null);
            setError(null);
            setRetryCount((count) => count + 1);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-4" role="status">
        Loading app configuration...
      </div>
    );
  }

  return (
    <RuntimeConfigContext.Provider value={config}>
      {children}
    </RuntimeConfigContext.Provider>
  );
}
