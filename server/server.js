import path from 'path'
import express from 'express'
import { MongoClient } from 'mongodb'
import template from './../template'
//comment out before building for production
import devBundle from './devBundle'
import config from './../config/config'
import app from './express'

app.listen(config.port, (error) => {

	if (error) {

		console.log(error)
	}

	console.info('Server started on port %s.', config.port)


} )