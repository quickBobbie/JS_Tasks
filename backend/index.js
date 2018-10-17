const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const Server = require('./modules/Server');
const Database = require('./modules/Database');
const router = require('./modules/router');

const config = require('./config');

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());
app.use(router);

const server = new Server(app, config.server);
server.start();

const database = new Database(config.database);

let db = database.connect();

db.on('open', database.open);
db.on('error', database.error);