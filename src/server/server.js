const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const api = require('../server/routes/api');

// Parsers
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Allow all access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

// API location
app.use('/api', api);

app.post('/games/create', function (req, res) {
  res.send('Getting api!')
});

app.get('/rules/get', function (req, res) {
  res.send('Getting api!')
});

app.get('/games/get', function (req, res) {
  res.send('Getting api!')
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log('-------------- GameOfDrones ----------------');
  console.log(` *** Server running on localhost:${port} ***`);
  console.log('-------------------------------------------');
});