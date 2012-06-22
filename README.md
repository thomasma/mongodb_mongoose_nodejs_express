BASIC MONGO SHELL COMMANDS
=========================================================
Start Mongodb - mongod --dbpath ~/temp/mongodata/

Start shell - mongo
> use contributionsdb;
> db.contribution.count();

cd /home/mathew/projects/nodejs/mongoose
node basicnodejshello.js (http://localhost:3000/)
node hellothere.js (http://localhost:3000/mathew)


    show dbs (lists all the current databases).
    use <databasename> (database name I used is contributionsdb).
    show collections (collection name I use is contribution).
    db.contribution.findOne() (finds one record and displays it).
    db.contribution.find({candNm:”name here”}) 
    db.contribution.getIndexes() (returns all the current index names).
    db.contribution.dropIndex({candNm:1}) (drop existing index).
    db.contribution.ensureIndex({candNm:1}) (create index).
    db.contribution.ensureIndex({contbrEmployer:1}) (create index).
    db.contribution.count() (get count of records in the collection).
    db.contribution.remove() (removes the collection).



RUN MAP REDUCE : FIND MAX AND MIN CONTRIBUTION AMOUNTS PER CANDIDATE
=====================================================================
    map = function() {
      if ( this.contbReceiptAmt > 0 ) {
         var x = { amt: this.contbReceiptAmt, candNm: this.candNm, contbrNm: this.contbrNm, contbrEmployer: this.contbrEmployer, _id: this._id };
         emit(this.candNm, {min:x, max: x} );
      }
    };

    reduce = function (key, values) {
        var res = values[0];
        for ( var i=1; i<values.length; i++ ) {
            if ( values[i].min.amt < res.min.amt ) 
               res.min = values[i].min;
            if ( values[i].max.amt > res.max.amt ) 
               res.max = values[i].max;
        }
        return res;
    };

    db.contribution.mapReduce( map , reduce , { out : { inline : true } } );



RUN MAP REDUCE : TRANSACTION COUNT, TOTAL DOLLARS CONTRIBUTED BY CANDIDATE
==========================================================================
    map = function() {
        emit( this.candNm, {count: 1, candNm: this.candNm, amt: this.contbReceiptAmt} );
    };


    reduce = function(key, values) {
        var result = {count: 0, amt: 0, candNm:""};
        values.forEach(function(value) {
          result.count += value.count;
          result.amt += value.amt;
          result.candNm = value.candNm;
        });
        return result;
    };
    db.contribution.mapReduce( map , reduce , { out : { inline : true } } );


RUN MAP REDUCE : FIND MAX AND MIN CONTRIBUTION AMOUNTS FROM A Company
=====================================================================
    function isNumber (o) {
      return ! isNaN (o-0) && o != null;
    }

    map = function() {
      if ( this.contbrEmployer == 'FANNIE MAE' && isNumber(this.contbReceiptAmt)) {
         emit(this.contbrEmployer, { count:1, amt: this.contbReceiptAmt, contbrNm: this.contbrNm } );
      }
    };

    reduce = function (key, values) {
        var result = {count:0, amt:0};
        values.forEach(function(value) {
          result.count += value.count;
          result.amt += value.amt;
        });
        return result;
    };

    db.contribution.mapReduce( map , reduce , { out : { inline : true } } );


URL FOR THE REST CALLS
=========================================================
    http://localhost:3000/candidate/findone/Obama,%20Barack
    http://localhost:3000/candidate/count/Obama,%20Barack
    http://localhost:3000/candidate/findall/McCotter,%20Thaddeus%20G
    http://localhost:3000/candidate/findall/Huntsman,%20Jon


References
=========================================================
MapReduce Overview - http://kylebanker.com/blog/2009/12/mongodb-map-reduce-basics/
