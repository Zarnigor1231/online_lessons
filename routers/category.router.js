import express from "express";
import {
    categoryCreate,
    categoryDelete,
    categoryGet,
    categoryUpdate,
    get,
    videoGet,
    videosGet
} from "../controllers/category.controller.js";
import isLogin from "../utils/isLoggedIn.js";

const router = express.Router();

router.get("/", get)
router.get("/:category", categoryGet)
router.get("/:category/:sap_category", videosGet)
router.get("/:category/:sap_category/:video", videoGet)


router.post("/", isLogin, categoryCreate);

router.put("/:id", isLogin, categoryUpdate)

router.delete("/:id", isLogin, categoryDelete)

export default router