import app from './app.js';
import runDBMigrations from '../db/migrations/index.js';

async function start() {
    // Run database migrations
    await runDBMigrations();

    const port = 3001;

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

start();
