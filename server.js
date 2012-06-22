// ===========================================================
// common objects 
// ===========================================================
var express = require('express');
var app = express.createServer();
var console = require('console');
var mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/contributionsdb');


// ===========================================================
// the domain object for candidate contributions
// ===========================================================
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Contribution = new Schema({
    _id    : ObjectId,
    cmteId     : String, 
    candId     : String, 
    candNm     : String, 
    contbrNm     : String, 
    contbrCity   : String, 
    contbrSt     : String, 
    contbrZip    : String, 
    contbrEmployer     : String, 
    contbrOccupation   : String, 
    contbReceiptAmt    : String, 
    contbReceiptDt     : Date, 
    receiptDesc     : String, 
    memoCd     : String, 
    memoText   : String, 
    formTp     : String, 
    fileNum    : String
}, { collection : 'contribution' });

var ContributionModel = mongoose.model('contribution', Contribution);


// ===========================================================
// find one record for a candidate
// ===========================================================
app.get('/candidate/findone/:name', function(req, res) {
   ContributionModel.findOne({'candNm' : req.params.name}, function (err, result) {
        if (result != null) {
            res.json(result);
        }
        else {
            res.send('No records found for candidate name ' + req.params.name);
        }
   });
});

// ===========================================================
// return the total count of transactions for a candidate
// ===========================================================
app.get('/candidate/count/:name', function(req, res) {
   ContributionModel.count({'candNm' : req.params.name}, function (err, result) {
        if (result != null) {
            res.send(result + ' records found for candidate ' + req.params.name);
        }
        else {
            res.send('No records found for candidate name ' + req.params.name);
        }
   });
});

// ===========================================================
// return all records for a candidate (use carefully)
// ===========================================================
app.get('/candidate/findall/:name', function(req, res) {
   ContributionModel.find({'candNm' : req.params.name}, function (err, results) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        if (results != null) {
            results.forEach(function(record){
               res.write(JSON.stringify(record));
               res.write("<br/><br/>");
            });
            res.end();
        }
        else {
            res.send('No records found for candidate name ' + req.params.name);
        }
   });
   //res.send(JSON.stringify(pojo));
});

/*
ContributionModel.find({'candNm' : 'Bachmann, Michelle'}, function (err, docs) {
  console.log(docs);
  docs.forEach(function(record){
    console.log(record.candNm);
  });
});
*/

app.get('/', function(req, resp) {
   resp.send('hello there');
});

//start server
app.listen(3000);
