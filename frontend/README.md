# YouTubeoke

The server and frontend share the root `package.json`, lockfile, and environment files. Run all npm commands from the repository root.

## Development

Install dependencies once with `npm install`, then start the server and frontend in separate terminals:

- `npm run dev` starts the server.
- `npm run dev:frontend` starts the Vite frontend.

The frontend runs on port 3001 and connects to the server on port 3000 by default.

## Build and lint

- `npm run build` builds the server and frontend.
- `npm run lint` lints the frontend.
- `npm run preview:frontend` previews the built frontend.

## Environment

Copy the root `.env.sample` to `.env` and adjust the server paths for your machine. Vite reads the same root env files; only variables prefixed with `VITE_` are exposed to frontend code. `.env.development` overrides matching values when running the frontend in development mode.
