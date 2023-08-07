import db from "../db/db.connect.js";


export const commentCreate = async (req, res) => {
    try {
        const {
            video_id,
            comment
        } = req.body;


        const video = await db.query(`SELECT * FROM videos WHERE id = $1`, [video_id])

        if (!video.rows) throw Error('video is not available')

        const commentCreate = await db.query(`INSERT INTO comments(user_id, video_id, comment) VALUES($1, $2, $3) RETURNING *`, [res.locals.user.id, video_id, comment]);

        res.send({
            status: 200,
            message: 'completed successfully',
            data: commentCreate.rows[0]
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};


export const commentUpdate = async (req, res) => {
    try {
        const {
            comment
        } = req.body

        const id = req.params.id

        const commentVideo = await db.query(`SELECT * FROM comments WHERE id = $1`, [id])
        if (!commentVideo.rows[0]) throw Error('comment is not available')

        if (res.locals.user.id !== commentVideo.rows[0].user_id) throw Error('Editing of the comment is not allowed')

        const commentData = await db.query(`UPDATE comments SET user_id = $1, video_id = $2 , comment = $3  WHERE id = $4 RETURNING *`, [res.locals.user.id, commentVideo.rows[0].video_id, comment, id])

        res.send({
            status: 200,
            message: 'completed successfully',
            data: commentData.rows[0]
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};


export const commentDelete = async (req, res) => {
    try {
        const id = req.params.id

        const commentVideo = await db.query(`SELECT * FROM comments WHERE id = $1`, [id])
        if (!commentVideo.rows[0]) throw Error('comment is not available')

        if (res.locals.user.id !== commentVideo.rows[0].user_id) throw Error('Editing of the comment is not allowed')

        const commentDel = await db.query(`DELETE FROM comments WHERE id = $1 RETURNING *`, [id])

        res.send({
            status: 200,
            message: 'deleted successfully',
            data: commentDel.rows[0]
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
}