import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const db = new pg.Pool({
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;
