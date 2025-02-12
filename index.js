require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Hi, how are you?' });
});

app.use('/api/auth/', authRouter);

app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});
