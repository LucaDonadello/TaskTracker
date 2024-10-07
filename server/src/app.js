import express from 'express';
import ideasRouter from '../routes/ideas_router.js';

const app = express();
app.use(express.json());
app.use('/ideas', ideasRouter)

export default app;