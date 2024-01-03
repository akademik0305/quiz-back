import express from 'express';
import mongoose from 'mongoose';
import quizRouter from './routes/quizRouter.js';

const app = express();
app.use(express.json())
app.use('/quiz', quizRouter)
// mongodb+srv://user:qwertyu@cluster0.hbcc3ys.mongodb.net/?retryWrites=true&w=majority
const PORT = 3030;
const MONGO_URL =
  'mongodb+srv://user:qwertyu@cluster0.hbcc3ys.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Db connected');
    app.listen(PORT, (err) => {
      if (!err) {
        console.log('Server successfuly running');
      } else {
        console.log(`Error: ${err}`);
      }
    });
  } catch (e) {
    console.log(`Db connect error`);
  }
}

connect();
