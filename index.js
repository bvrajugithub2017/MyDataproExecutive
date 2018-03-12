var express = require('express');
//express is a Node.js framework. It is used to simplify some of the basic tasks.

var bodyParser = require('body-parser');
var rajuRoutes = require('./routes/api');  //.js not required
var app = express(); //set up express application

var mongoose = require('mongoose');

const config = require('./config/database.js');

const port = process.env.PORT || 3000;

//mongoose is a Node.js module which is used to interact easily with MongoDB databases.

// Why MongoDB ?
// -> NoSQL database.
// -> Data is stored in Objects rather than tables in MySQL.
// -> Easier to work with Node.js.
// -> Stores data in JSON format.

//mongoose.connect('mongodb://localhost/forDataproDB1');
//if the database account doesn't exist yet, it would be created.

mongoose.connect(config.uri, (err) => {

    if(err)
        console.log('Cound not connect to MongoDB Database: ', err);
    else
        console.log('Connected Successfully to MongoDB Database: ' + config.uri);
});


// var db = mongoose.connection;
//
// db.once('open', function(){
//   console.log('Connected to MongoDB database successfully running at: ' + muri);
// });
//
// db.on('error', function(){
//   console.log(err);
// });

app.use(bodyParser.json({limit: '20mb'})); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//initializing the routes
app.use('/api', rajuRoutes);
//the url prefix that we want to use for our four routes.

var myServer = app.listen(port, function(){
    var host = myServer.address().address;
  	var port = myServer.address().port;
  	console.log('Server listening at http://%s : %s', host, port);
});
