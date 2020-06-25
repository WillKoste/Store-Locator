const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const cors = require('cors');
const colors = require('colors');
const favicon = require('serve-favicon');
const connectDB = require('./db');

const app = express();

connectDB();

app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api/v1/stores', require('./routes/stores'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`She lives on port ${PORT}, and runs in ${process.env.NODE_ENV} mode ;)`.magenta.bold.underline);
})