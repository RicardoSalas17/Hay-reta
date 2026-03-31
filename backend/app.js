require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

function validateMongoUri(uri) {
  if (!uri) {
    throw new Error('Missing DB environment variable');
  }

  const matchesSrv = uri.startsWith('mongodb+srv://');
  const matchesStandard = uri.startsWith('mongodb://');

  if (!matchesSrv && !matchesStandard) {
    throw new Error('DB must be a valid MongoDB connection string');
  }

  const dbName = uri.split('?')[0].split('/').pop();

  if (!dbName) {
    throw new Error('DB connection string must include a database name, for example /hay-reta before the query string');
  }
}

const allowedOrigins = (process.env.CORS_ORIGINS || [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://hay-reta-rs17-ironhackproject.netlify.app'
].join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

try {
  validateMongoUri(process.env.DB);

  mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => {
      console.error('Error connecting to mongo', err);
      process.exit(1);
    });
} catch (error) {
  console.error(`Invalid Mongo configuration: ${error.message}`);
  process.exit(1);
}

mongoose.set('useFindAndModify', false);

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    }
  })
)

app.set('trust proxy', 1);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

const index = require('./routes/index');
const auth = require('./routes/auth');
const matchs = require('./routes/match');
const comment = require('./routes/comment');
const team = require('./routes/team');

app.use('/', index);
app.use('/', auth);
app.use('/', matchs);
app.use('/', comment);
app.use('/', team);

// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
