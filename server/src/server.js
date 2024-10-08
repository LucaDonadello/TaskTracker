import app from './app.js';
import runDBMigrations from '../db/migrations/index.js';
import cors from 'cors'; // Import the cors package

async function start() {
    // Run database migrations
    await runDBMigrations();
    
    // Enable CORS
    app.use(cors({
        origin: 'http://localhost:3000', // Replace with your front-end URL
        credentials: true, // Allow credentials (e.g., cookies)
    }));

    const port = 3001;

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

start();
