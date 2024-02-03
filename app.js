/**
 * This file represents the main entry point of the Notepad API application.
 * It imports necessary modules, sets up the Express application, connects to the database,
 * defines routes, and starts the server.
 * @author José Mavárez
 */ 

//Importing external modules.
import express from 'express';

// Importing custom functions and middlewares.
import connectDB from './src/db/connectDB.js';
import authRouter from './src/routing/authRouter.js';
import userRouter from './src/routing/userRouter.js';
import categoriesRouter from './src/routing/categoriesRouter.js';
import priorityRouter from './src/routing/priorityRouter.js';
import notesRouter from './src/routing/notesRouter.js';
import reqReceivedMiddleware from './src/middlewares/reqReceivedMiddleware.js';
import corsMiddleware from './src/middlewares/corsMiddleware.js';

try {
    /**
     * Instance of the Express application. 
     * @const
     * @type {express.Application}
     */
    const app = express();
    
    //Connect to MongoDB
    await connectDB();
    
    //Middlewares to parse JSON and form requests.
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Middleware to log and show incoming requests.
    app.use(reqReceivedMiddleware);

    //Middleware to enable CORS.
    app.use(corsMiddleware);

    // Authentication, users, priorities, categories and notes routes.
    app.use('/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/priorities', priorityRouter);
    app.use('/api/categories', categoriesRouter);
    app.use('/api/notes', notesRouter);
    
    /**
     * Port where the server will listen.
     * @const
     * @type {number}
     */
    const PORT = process.env.PORT

    // Start the server and show a message in the console.
    app.listen(PORT, () => console.log(`API started successfully!`));
} catch (error) {
    console.log(`API crashed: ${error.message}`);
}