import express from "express";
import jwt from 'jsonwebtoken';
import db from "../db/db.connect.js"
import "dotenv/config";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isLogin = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (token.startsWith('Bearer ')) {
            token = token.substring('Bearer '.length);
        }
        const payload = jwt.verify(token, process.env.TOKEN_KEY)

        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [payload.email])

        res.locals.user = user.rows[0]

        if (!payload.login) {
            return res.status(400).json({
                message: "You are not logged in"
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            error
        })
    }
};

export default isLogin