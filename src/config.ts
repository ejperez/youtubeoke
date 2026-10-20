import dotenv from "dotenv";
import type { CorsOptions } from "cors";

dotenv.config();

export const PORT = process.env.PORT;
export const SERVER_IP = process.env.SERVER_IP;
export const SERVER_URL = `http://${SERVER_IP}:${PORT}`;
export const DOWNLOAD_DIR = "downloads";
export const FFMPEG_DIR = process.env.FFMPEG_DIR || "";
export const YTDLP_BINARY = process.env.YTDLP_BINARY || "";
export const BLOCKED_CHANNELS = process.env.BLOCKED_CHANNELS || "";

export const corsOptions: CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS || "*",
  methods: ["GET", "POST"],
};
