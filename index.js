import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectWithDb} from './config/db.js'
import questionRouter from './routes/questions.routes.js';
import optionRouter from './routes/options.routes.js';

const app = express();
const { PORT } = process.env;

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use express router
app.use('/questions',questionRouter);
app.use('/options',optionRouter);

// Connect to server
app.listen(PORT || 5000, (err) => {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is up and running at ${PORT}`);
  connectWithDb();
});
