import express from 'express';
import Connection from './database/db.js'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import DefaultData from './default.js'
import Routes from './routes/routes.js'


dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;



Connection(username, password);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}


app.listen(process.env.PORT || 8000,()=>console.log(`server is running on ${process.env.PORT || 8000}`));
DefaultData();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',Routes);
