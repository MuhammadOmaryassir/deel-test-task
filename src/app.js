const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const router = require('./routes/router');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use(router);

app.use((error, req, res, next) => {
  console.error(error); // not okay inn production, but this is test task
  res.status(500).json({
    error: error.message,
  });
});

module.exports = app;
