// ===========================================================
// SCHEMA OBJECTS AND DATABASE CONNECTIONS
// ===========================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contributionsdb');


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


var CandidateTransactionSummary = new Schema({
    _id    : String,
    value     : {count: Number, amt: Number, candNm: String, contbrEmployer: String}
}, { collection : 'CandidateTransactionSummary' });


var MaxMinContribsPerCandidate = new Schema({
    _id    : String,
    value     : { min: {amt: Number, candNm: String, contbrNm: String, contbrEmployer: String},
                  max: {amt: Number, candNm: String, contbrNm: String, contbrEmployer: String}}
}, { collection : 'MaxMinContribsPerCandidate' });


var TotalContributionsByCompany = new Schema({
    _id    : String,
    value     : { min: {amt: Number, candNm: String, contbrNm: String},
                  max: {amt: Number, candNm: String, contbrNm: String}}
}, { collection : 'ContributionsByCompany' });


var ContributionModel = mongoose.model('contribution', Contribution);
var CandidateTransactionSummaryModel = mongoose.model('CandidateTransactionSummary', CandidateTransactionSummary);
var MaxMinContribsPerCandidateModel = mongoose.model('MaxMinContribsPerCandidate', MaxMinContribsPerCandidate);
var TotalContributionsByCompanyModel = mongoose.model('TotalContributionsByCompany', TotalContributionsByCompany);


module.exports.ContributionModel = ContributionModel
module.exports.CandidateTransactionSummaryModel = CandidateTransactionSummaryModel
module.exports.MaxMinContribsPerCandidateModel = MaxMinContribsPerCandidateModel
module.exports.TotalContributionsByCompanyModel = TotalContributionsByCompanyModel

