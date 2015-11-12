require('dotenv').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('api/v1/notes', require('./routes/notes'));

app.listen(3000, function() {
    console.log(process.env.DB_URI);
    console.log('Listening on http://localhost:3000');
});
