import {
    compare,
    hash
} from "bcrypt";
import db from "../db/db.connect.js"
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userRegister = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const hashedPassword = (await hash(password, 10));

        const user = await db.query(`INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`, [name, email, hashedPassword])

        const token = jwt.sign({
                email: user.email
            },
            process.env.TOKEN_KEY, {
                expiresIn: "1w"
            }
        );

        res.send({
            status: 200,
            message: 'successfully registered',
            data: user.rows[0],
            token
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};

export const userLogin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const userEntered = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!userEntered) throw new Error(`${email} this email is not registered`);

        const isPasswordMatching = await compare(password, userEntered.rows[0].password);
        if (!isPasswordMatching) throw Error('Password is not matching');

        const token = jwt.sign({
                email,
                login: "login"
            },
            process.env.TOKEN_KEY, {
                expiresIn: "1w"
            }
        );

        res.send({
            status: 200,
            message: 'successfully logged in',
            token: token
        });
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
}