require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();
const colors = require('colors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Route files

// Connect to database
connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

// Mount routes
app.get('/', (req, res) => res.send('ok'));

// Error handler middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`.red);

  server.close(() => process.exit(1));
});
