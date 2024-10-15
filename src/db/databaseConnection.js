import mysql2 from 'mysql2'
import { config } from 'dotenv';

config();

const pool = mysql2.createPool({
    host: process.env.db_host,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_database,
    queueLimit: process.env.db_limit,
})

export default pool