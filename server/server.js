import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import template from './../template';
import mongoose from 'mongoose';
import config from './../config/config';
import app from './express';
//comment out before building for production
import devBundle from './devBundle';

// configure mongoose for es6 promises
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(config.port, error => {
  if (error) {
    console.log(error);
  }

  console.info('Server started on port %s.', config.port);
});
