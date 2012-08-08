// ===========================================================
// RESTful services exposed via Nodejs,express and mongoose
// ===========================================================

// load 3rd party modules 
var express = require('express');
var app = express();

// load our custom data access module
var DataAccess = require('./models');
// ===========================================================


// ===========================================================
// find one record for a candidate
// ===========================================================
app.get('/candidate/findone/:name', function(req, res) {
   DataAccess.ContributionModel.findOne({'candNm' : req.params.name}, function (err, result) {
        if (result != null) {
            res.json(result);
        }
        else {
            res.send('No records found for candidate name ' + req.params.name);
        }
   });
});


// ===============================================================
// AD-HOC: Return the total count of transactions for a candidate
// ===============================================================
app.get('/candidate/count/:name', function(req, res) {
   DataAccess.ContributionModel.count({'candNm' : req.params.name}, function (err, result) {
        if (result != null) {
            res.send(result + ' records found for candidate ' + req.params.name);
        }
        else {
            res.send('No records found for candidate name ' + req.params.name);
        }
   });
});


// =================================================================================
// RUN MAP REDUCE #1 : TRANSACTION COUNT, TOTAL DOLLARS CONTRIBUTED (BY CANDIDATE)
// =================================================================================
app.get('/candidate/candidatetxnsummary', function(req, res) {
   DataAccess.CandidateTransactionSummaryModel.find({}, function (err, result) {
        if (result != null) {
            res.json(result);
        }
        else {
            res.send('No records found');
        }
   });
});


// ===========================================================
// RUN MAP REDUCE #2 : FIND MAX AND MIN CONTRIBUTION AMOUNTS PER CANDIDATE
// ===========================================================
app.get('/candidate/maxmincontribspercandidate', function(req, res) {
   DataAccess.MaxMinContribsPerCandidateModel.find({}, function (err, result) {
        if (result != null) {
            res.json(result);
        }
        else {
            res.send('No records found');
        }
   });
});


// ===========================================================
// RUN MAP REDUCE #3 : FIND TOTAL CONTRIBUTION FROM A Company
// ===========================================================
app.get('/candidate/totalcontributionsbycompany/:companyname', function(req, res) {
   DataAccess.TotalContributionsByCompanyModel.find({'_id': req.params.companyname}, function (err, result) {
        if (result != null) {
            res.json(result);
        }
        else {
            res.send('No records found');
        }
   });
});


// ==============================================================
// AD HOC : return all records for a candidate (use carefully)
// ==============================================================
app.get('/candidate/findall/:name', function(req, res) {
   DataAccess.ContributionModel.find({'candNm' : req.params.name}, function (err, results) {
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
});


// ==============================================================
// basic health check
// ==============================================================
app.get('/', function(req, resp) {
   resp.send('code is running');
});


// ==============================================================
//start server
// ==============================================================
app.listen(3000);
console.log('Listening localhost:3000');
