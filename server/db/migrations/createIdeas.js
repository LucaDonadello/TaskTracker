const createTableIdeas = `
    CREATE TABLE IF NOT EXISTS ideas (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        ideaDesc VARCHAR(255) NOT NULL
    );
`;

export default createTableIdeas;