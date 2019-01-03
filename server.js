// server.js
// where your node app starts

// init project
const mongoose = require("mongoose")
const express = require('express');
const adduser = require(__dirname + "/api/newuser.js")
const addexercise = require(__dirname + "/api/add-exercise.js")
const search = require(__dirname + "/api/search.js")
const bodyParser = require("body-parser")

require("./model/db.js")
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/api/exercise/new-user', adduser.adduser)
app.post('/api/exercise/add', addexercise.addexercise)
app.get('/api/exercise/log',search.search)

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
