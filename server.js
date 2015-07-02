var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './client')));

//must be before routes.js!!
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

// app.get('/', function (req, res) {
// 	res.render('index');
// })

var server = app.listen(1232, function () {
	console.log('Established connection to 1232.');
})