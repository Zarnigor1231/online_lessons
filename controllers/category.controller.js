import db from "../db/db.connect.js";



export const get = async (req, res) => {
    try {
        const categories = await db.query(`SELECT * FROM categories`)

        res.send({
            status: 200,
            data: categories.rows
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
}

export const categoryGet = async (req, res) => {
    try {
        const query = req.params;
        const categories = await db.query(`SELECT sc.id, sc.name FROM categories as sc JOIN  categories as c on c.id = sc.sap_cat_id and c.name = $1`, [query.category])
        if (!categories.rows[0]) throw Error('There are no categories')

        res.send({
            status: 200,
            data: categories.rows
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
}

export const videosGet = async (req, res) => {
    const query = req.params;

    const categoryVideo = await db.query(`SELECT v.id, v.name FROM videos as v JOIN  categories as c on c.id = v.category_id and c.name = $1`, [query.sap_category])
    if (!categoryVideo.rows[0]) throw Error('video is not available')

    res.send({
        status: 200,
        data: categoryVideo.rows
    })
}

export const videoGet = async (req, res) => {
    const query = req.params;

    const categoryVideo = await db.query(`SELECT * FROM videos WHERE name = $1`, [query.video])
    if (!categoryVideo.rows[0]) throw Error('video is not available')

    res.send({
        status: 200,
        data: categoryVideo.rows[0]
    })
}

export const categoryCreate = async (req, res) => {
    try {
        const {
            name,
            sap_cat_id
        } = req.body

        const sapCategory = await db.query(`INSERT INTO categories(name, sap_cat_id) VALUES($1, $2) RETURNING *`, [name.toLowerCase(), sap_cat_id])

        res.send({
            status: 200,
            data: sapCategory.rows[0]
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};

export const categoryUpdate = async (req, res) => {
    try {
        const {
            name
        } = req.body
        const id = req.params.id


        const sapUpdate = await db.query(`UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`, [name.toLowerCase(), id])

        res.send({
            status: 200,
            message: 'completed successfully',
            data: sapUpdate.rows[0]
        })

    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
}

export const categoryDelete = async (req, res) => {
    try {
        const id = req.params.id

        const video_sap_category = await db.query(`SELECT * FROM videos WHERE category_id = $1`, [id])
        if (!video_sap_category.rows) throw Error('you can\'t delete it')

        const sap_category_del = await db.query(`DELETE FROM categories WHERE id = $1 RETURNING *`, [id])

        res.send({
            status: 200,
            message: 'completed successfully',
            data: sap_category_del.rows[0]
        })
    } catch (error) {
        res.send({
            status: 400,
            message: error.message
        })
    }
};