import db from "../db/db.connect.js"
import path from "path";
import {
    readFile,
    writeFile
} from "fs/promises";
import fs from "fs/promises";

export const videoAll = async (req, res) => {
    const videoAll = await db.query(`SELECT * FROM videos`)

    res.send(videoAll.rows)
}

export const videoCreate = async (req, res) => {
    try {
        const {
            name,
            category_id
        } = req.body
        const files = req.files

        const sapId = await db.query(`SELECT * FROM categories WHERE id = $1`, [category_id])
        if (!sapId.rows.length) throw Error('There is no such category')

        const filesArr = [];

        if (files) {
            for (const file of files) {
                let videoPath = `/videos/${Date.now()}-${file.originalname}`;
                videoPath = videoPath.replace(/\s/g, '');

                writeFile(path.join(process.cwd(), `uploads`, videoPath), file.buffer);

                filesArr.push(videoPath);
            }
        }

        const videos = await db.query(`INSERT INTO videos(files,user_id, category_id, name)  VALUES($1, $2, $3, $4) RETURNING *`, [filesArr, res.locals.user.id, category_id, name])

        res.send({
            status: 200,
            message: 'completed successfully',
            data: videos.rows[0]
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }

}

export const videoUpdate = async (req, res) => {
    try {
        const {
            name,
            category_id
        } = req.body
        const files = req.files
        const id = req.params.id

        const video = await db.query(`SELECT * FROM videos WHERE id = $1`, [id])

        if (!video.rows[0]) throw Error('video is not available')


        const filesArr = [];

        if (files) {

            if (video.rows[0].files) {
                for (const file of video.rows[0].files) {
                    fs.unlink(path.join(process.cwd(), `uploads`, file), (err) => {});
                }

            }

            for (const file of files) {
                let videoPath = `/videos/${Date.now()}${file.originalname}`;
                videoPath = videoPath.replace(/\s/g, '');

                writeFile(path.join(process.cwd(), `uploads`, videoPath), file.buffer);

                filesArr.push(videoPath);
            }
        }
        const videoUpdate = await db.query(`UPDATE videos SET category_id = $1, files = $2, user_id = $3, name = $4 WHERE id = $5 RETURNING *`, [category_id, filesArr, res.locals.user.id, name, id])

        res.send({
            status: 200,
            message: 'completed successfully',
            data: videoUpdate.rows[0]
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};

export const videoDelete = async (req, res) => {
    try {
        const id = req.params.id;

        const video = await db.query(`SELECT * FROM videos WHERE id = $1`, [id])

        if (!video) throw Error('video is not available')

        if (res.locals.user.id !== video.rows[0].user_id) throw Error('Video modification is not allowed')

        const videoDelete = await db.query(`DELETE FROM videos WHERE id = $1 RETURNING *`, [id])

        res.send({
            status: 200,
            message: 'deleted successfully',
            data: videoDelete.rows[0]
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }

}