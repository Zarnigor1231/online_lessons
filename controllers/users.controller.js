import {
    compare
} from "bcrypt"
import db from "../db/db.connect.js"

export const userUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const {
            name,
            email,
            password
        } = req.body

        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
        if (!user.rows[0]) throw Error('user does not exist')

        const isPasswordMatching = await compare(password, user.rows[0].password);
        if (!isPasswordMatching) throw Error('Password is not matching');

        const userUpdate = await db.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [name, email, user.rows[0].password, id])

        res.send({
            status: 200,
            message: 'completed successfully',
            data: userUpdate.rows[0]
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};

export const userDel = async (req, res) => {
    try {
        const id = req.params.id

        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
        if (!user.rows[0]) throw Error('user does not exist')

        const userDel = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])

        res.send({
            status: 200,
            message: 'deleted successfully',
            data: userDel.rows[0]
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
}