'use strict';

require('dotenv').config();

const {start} = require('./src/server');

const{sequelizeDatabase} = require('./src/models');

sequelizeDatabase.sync().then(() => {

  console.log('Database is connected');
  start();
})
  .catch(err => console.log('Error connecting to database', err));


 
