require('dotenv').config();
const express = require('express'),
  app = express(),
  indexRouter = require('./routes/index'),
  path = require('path'),
  logger = require('morgan'),
  cors = require('cors'),
  rateLimit = require('express-rate-limit'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 Menit
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const database = process.env.DATABASE;
mongoose.connect(database);

const db = mongoose.connection;
db.on('error', console.error.bind(console, '<:: connection error:'));
db.once('open', function () {
  console.log(`::> Database is Connecting`);
});

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.get('*', function (req, res) {
  res.status(404).send('Page Not Found');
});

module.exports = app;
