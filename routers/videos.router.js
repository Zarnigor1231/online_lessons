import express from "express";
import {
    upload
} from "../utils/multer.js";
import {
    videoAll,
    videoCreate,
    videoDelete,
    videoUpdate
} from "../controllers/videos.controller.js";
import isLogin from "../utils/isLoggedIn.js";

const router = express.Router();

router.get('/', videoAll)

// kichik hajmli videolar uchun
router.post('/', isLogin, upload.array('uploads', 3), videoCreate);

router.put('/:id', isLogin, upload.array('uploads', 3), videoUpdate);

router.delete('/:id', isLogin, videoDelete)

export default router;