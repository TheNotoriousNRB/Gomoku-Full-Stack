import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ConnectDB from './utils/DB.Connect';
import authHandler from './handler/Auth.Handler';
import gameHandler from './handler/Game.Handler';
import { env } from 'process';


dotenv.config();
//  Connect to database.
ConnectDB();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api/auth', authHandler);
app.use('/api/games', gameHandler);


mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })