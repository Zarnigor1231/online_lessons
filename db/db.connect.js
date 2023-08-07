import pg from "pg";
import "dotenv/config";

const Pool = pg.Pool;

const pool = new Pool({
    database: "lessons",
    password: "postgres",
    user: "postgres",
});

export default pool;