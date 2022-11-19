const path = require('path');
const express = require('express');
// const db = require("./db/index.js");


const cors = require('cors')
// const morgan = require('morgan');
const app = express();
// const apiRouter = require('./routes.api');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cors());

app.listen(3000, () => console.log("server 3000 is running")); //listens on port 3000 -> http://localhost:3000/

// modules.exports = app;
