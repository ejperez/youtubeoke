import { Router } from "express";
import { getNextSearchPage, searchVideos, } from "../services/youtubeSearch.js";
import VideoFileManager from "../VideoFileManager.js";
function createSearchRouter(videoFileManager) {
    const router = Router();
    const addIsDownloadedField = (response) => {
        response.items = response.items.map((item) => {
            return {
                ...item,
                isDownloaded: videoFileManager.getVideo(item.id) !== undefined,
            };
        });
        return response;
    };
    router.get("/:q", async (req, res) => {
        const results = await searchVideos(req.params.q);
        return res.send(addIsDownloadedField(results));
    });
    router.post("/nextPage", async (req, res) => {
        const results = await getNextSearchPage(req.body.nextPage);
        return res.send(addIsDownloadedField(results));
    });
    return router;
}
export default createSearchRouter;
//# sourceMappingURL=search.js.map