import app from './app.js';
import runDBMigrations from '../db/migrations/index.js';


async function start() {

    await runDBMigrations();
    const port = 3001;

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}

start();