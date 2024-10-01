import db from "../db/index.js";


const create = async ({ title, status, ideaDesc }) => {
    const query = `
        INSERT INTO ideas (title, status, ideaDesc)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const result = await db.query(query, [title, status, ideaDesc]);
    return result.rows[0];
}

const deleteOne = async (id) => {
    const query = `
        DELETE FROM ideas
        WHERE id = $1
        RETURNING *
    `;
    const result = await db.query(query, [+id]);
    return result.rows[0]
}

const getAll = async () => {
    const query = `
        SELECT * FROM ideas
    `;
    const result = await db.query(query);
    return result.rows;
}

const getCompleted = async () => {
    const query = `
        SELECT * FROM ideas
        WHERE status = 'Completed'
    `;
    const result = await db.query(query);
    return result.rows;
}

const getOnHold = async () => {
    const query = `
        SELECT * FROM ideas
        WHERE status = 'On Hold'
    `;
    const result = await db.query(query);
    return result.rows;
}

const getInProgress = async () => {
    const query = `
        SELECT * FROM ideas
        WHERE status = 'In Progress'
    `;
    const result = await db.query(query);
    return result.rows;
}

const updateStatus = async (id, title, status, ideaDesc) => {
    const query = `
        UPDATE ideas
        SET title = $2, status = $3, ideaDesc = $4
        WHERE id = $1
        RETURNING *
    `;
    const result = await db.query(query, [+id, title, status, ideaDesc]);
    return result.rows[0];
}

export default {create, deleteOne, getAll, getCompleted, getOnHold, getInProgress, updateStatus};