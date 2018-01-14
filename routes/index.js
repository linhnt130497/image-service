var express = require('express');
var router = express.Router();
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
//var config = require('../config');

//var mLab = "mongodb://" +config.db.host + "/" + config.db.name;

/* GET home page. */
router.get('/',function(req,res,next){

  res.redirect("http://"+req.get('host')+"/search/page=2/query=human");
})

//Search
router.get('/search/page=:page/query=:search', function(req, res, next) {
    // MongoClient.connect(mLab,function(err,db){
    //   if(err){
    //     console.log("Unable to connect to database");
    //   }else{
    //     console.log("Connected to database");
    //     var collection = db.collection('query');
    //     var data = {term: req.params.search, when: (new Date()).toString()};
    //     collection.insert(data);
    //     db.close();
    //   }
    // })
    var urlGet = 'https://api.imgur.com/3/gallery/search/top/' + req.params.page + '/?q=' + req.params.search;
    var options = {
      url: urlGet,
      headers: { Authorization: 'Client-ID fa53b5d7f8f4f42' },
      json: true
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(response);
        body = body.data.map(function(image){
          return {
            url : image.link,
            tile: image.title
          }
        });
        res.send(body);
      }
    }
    request(options, callback);
});

// Get History
router.get('/history',function(req,res){
  // MongoClient.connect(mLab,function(err,db){
  //   if(err){
  //     console.log("Unable to connect to database");
  //   }else{
  //     console.log("Connected to database");
  //     var collection = db.collection('query');
  //     collection.find({},{},{
  //       "sort" : {
  //         "when":-1
  //       },
  //       "limit": 4
  //     },function(err,history){
  //       history.toArray(function(err, result){
  //         res.send(result.map(function(doc){
  //           if(doc!=null){
  //             return {
  //               "term" : doc.term,
  //               "when" : doc.when
  //             };
  //           }
  //         }));
  //         db.close();
  //       });
  //     });
  //   }
  // })
})



module.exports = router;
