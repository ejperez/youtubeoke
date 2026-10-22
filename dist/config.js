import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const SERVER_IP = process.env.SERVER_IP;
export const SERVER_URL = `http://${SERVER_IP}:${PORT}`;
export const DOWNLOAD_DIR = "downloads";
export const FFMPEG_DIR = process.env.FFMPEG_DIR || "";
export const YTDLP_BINARY = process.env.YTDLP_BINARY || "";
export const BLOCKED_CHANNELS = process.env.BLOCKED_CHANNELS || "";
export const NO_DOWNLOADS = (process.env.NO_DOWNLOADS ?? process.env.VITE_NO_DOWNLOADS) === "true";
export const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ["GET", "POST"],
};
//# sourceMappingURL=config.js.map