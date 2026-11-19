import { Router } from "express";
import VideoFileManager, {} from "../VideoFileManager.js";
function createSongsRouter(videoFileManager) {
    const router = Router();
    router.get("/", async (req, res) => {
        const search = req.query.search;
        const sortBy = req.query.sort;
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 10;
        await videoFileManager.ready;
        const results = videoFileManager.getVideos({
            perPage,
            currentPage,
            search,
            sortBy,
        });
        return res.send({
            data: results,
            max_pages: Math.ceil(videoFileManager.getVideosMatchCount() / perPage),
        });
    });
    return router;
}
export default createSongsRouter;
//# sourceMappingURL=songs.js.map