import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();


app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());                


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Pollify Backend!');
});



export default app;

