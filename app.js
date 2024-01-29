import express from 'express';
import dotenv from 'dotenv';
import getEnvPath from './src/utils/getEnvPath.js';
import LOG_STYLES from './src/utils/chalkStyles.js';
import connectDB from './src/db/db.js';
import authRouter from './src/routing/authRouter.js';
import userRouter from './src/routing/userRouter.js';
import priorityRouter from './src/routing/priorityRouter.js';
import reqReceivedMiddleware from './src/middlewares/reqReceivedMiddleware.js';
import corsMiddleware from './src/middlewares/corsMiddleware.js';

const envPath = getEnvPath();
dotenv.config({ path: envPath });

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqReceivedMiddleware);
app.use(corsMiddleware);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/api', priorityRouter);

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(LOG_STYLES.SERVER_ON(`API started at http://localhost:${PORT}`)));
