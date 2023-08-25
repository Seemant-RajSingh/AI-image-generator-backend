import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);

// api key fetch request handling
app.get('/api/v1/api_key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.status(200).json({ apiKey });
});


app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Pixi Prompt!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => console.log('Server started'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
