import db from "../index.js";
import createTableIdeas from "./constCreateIdeas.js";
import createTableUsers from "./constCreateUsers.js";

const runDBMigrations = async () => {
    const client = await db.connect();
    try {
        await client.query(createTableIdeas);
        await client.query(createTableUsers);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

export default runDBMigrations;