import db from "../index.js";
import createTableIdeas from "./createIdeas.js";

const runDBMigrations = async () => {
    const client = await db.connect();
    try {
        await client.query(createTableIdeas);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

export default runDBMigrations;