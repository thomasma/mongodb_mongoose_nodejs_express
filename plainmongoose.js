var console = require('console');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contributionsdb');
console.log('connected to db');

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

console.log('running query on mongodb database');
ContributionModel.find({'contbrEmployer': 'FANNIE MAE'}, function (err, docs) {
  //console.log(docs);
  docs.forEach(function(record){
    console.log(record.contbrNm + ': ' + record.contbrCity + ': ' + record.contbReceiptAmt + ': ' + record.contbrEmployer);
  });
});

//console.log('done');

