const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const youtubesearchapi = require("youtube-search-api");
const path = require("path");

const app = express();
const server = http.createServer(app);

dotenv.config();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || "*",
  methods: ["GET"],
};

const subFolder = process.env.SUBFOLDER || "";
const PORT = process.env.PORT || 0;

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});

app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
  path: `${subFolder}/socket.io`,
});

// Endpoints for searching YouTube
const LIMIT = 100;
const BLOCKED_CHANNELS = process.env.BLOCKED_CHANNELS || [];

const filterVideos = (items) => {
  return items
    .filter((item) => item.type === "video")
    .filter((item) => !BLOCKED_CHANNELS.includes(item.channelTitle));
};

const processResponse = (data, res) => {
  const items = [...filterVideos(data.items)];

  res.send({
    items: items,
    nextPage: data?.nextPage,
  });
};

app.use(`${subFolder}/`, express.static("./frontend/dist"));

app.get(`${subFolder}/api/search/:q`, limiter, async (req, res) => {
  const data = await youtubesearchapi.GetListByKeyword(
    req.params.q,
    false,
    LIMIT,
    [{ type: "video" }],
  );

  return processResponse(data, res);
});

app.post(`${subFolder}/api/search/nextPage`, limiter, async (req, res) => {
  const data = await youtubesearchapi.NextPage(req.body.nextPage, false, LIMIT);

  return processResponse(data, res);
});

// Web Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sync-event", (data) => {
    socket.broadcast.emit("sync-event", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT);
