import express from 'express';
import cors from 'cors';
import ideasRouter from '../routes/ideas_router.js';
import authRouter from '../routes/auth_router.js';

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from your frontend app
  credentials: true,                 // Allow credentials
}));

app.use(express.json());
app.use('/ideas', ideasRouter);
app.use('/auth', authRouter);

export default app;
