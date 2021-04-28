const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors')
const app = express();

//constantes
const PASS = process.env.PASS;
const USER = process.env.USER;
const DB_NAME = process.env.DB_NAME;

const awsServerlessExpressMidleware = require('aws-serverless-express/middleware');


// Midlewares 
app.use(cors())
app.use(express.json());
app.use(awsServerlessExpressMidleware.eventContext());


// Settings
let url = `mongodb+srv://${USER}:${PASS}@cluster0.dprot.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log("bd conectada"))
    .catch(e => console.log("error en conexion", e))

app.use(require('./routes/routes'))


module.exports = app;