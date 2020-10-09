require('dot-env');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const serverConfig = require('./config/server');
const PORT = serverConfig[process.env.NODE_ENV].port || 3000;

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Connect to database
mongoose
  .connect(serverConfig[process.env.NODE_ENV].dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Bring in routers
const usersRouter = require('./routes/users');

// Define base routes
app.use('/users', usersRouter);



app.listen(PORT, () => {
    console.log(`WIT server started at localhost:${PORT}`);
});