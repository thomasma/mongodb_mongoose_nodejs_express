var console = require('console');

var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('contributionsdb', server);

db.open(function(err, db) {
  if(!err) {
    db.collection('contribution', function(err, collection) {

        var stream = collection.find({"contbrNm" : "LIBERTY PAC"}).streamRecords();
        stream.on("data", function(item) { console.log(item);});
        stream.on("end", function() {});

        //collection.findOne({mykey:1}, function(err, item) {});
    });
  };
});


