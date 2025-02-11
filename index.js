const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('dataBase connected');
  })
  .catch(err => {
    console.log(err);
  });
app.get('/', (req, res) => {
  res.json({ messagae: 'hii how are you' });
});

app.listen(process.env.PORT, () => {
  console.log('server started');
});
