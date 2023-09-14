require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DB } = require('./utils/config');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
