import express from "express";
import isLogin from "../utils/isLoggedIn.js";
import {
    commentCreate,
    commentDelete,
    commentUpdate
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post('/', isLogin, commentCreate);

router.put('/:id', isLogin, commentUpdate);

router.delete('/:id', isLogin, commentDelete);

export default router;