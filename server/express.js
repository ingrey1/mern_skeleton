import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compress from 'compression';
import cors from 'cors';


const app = express()

// config
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
app.use(compress())
app.use(helmet())

export default app