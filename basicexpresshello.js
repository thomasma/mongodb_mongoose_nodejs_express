// express
var express = require('express');
var app = express.createServer();

// console for logging
var console = require('console');


// function to say hello
app.get('/:name', function(req, resp) {
   resp.send('hello there ' + req.params.name);
});

//start server
app.listen(3000);


console.log('Server running at http://127.0.0.1:3000/');
