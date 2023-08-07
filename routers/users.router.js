import express from "express";
import isLogin from "../utils/isLoggedIn.js";
import {
    userDel,
    userUpdate
} from "../controllers/users.controller.js";

const router = express.Router();

router.put('/:id', isLogin, userUpdate);

router.delete('/:id', isLogin, userDel);

export default router;