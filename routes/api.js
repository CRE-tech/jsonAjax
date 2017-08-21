var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/practice1');
var listingCollection = db.collection('listings');
var imageCollection = db.collection('image');
var randomstring = require("randomstring");
var refString  = randomstring.generate(32);
var ObjectId = require('mongodb').ObjectID;

// router.post('/', function(req, res, next) {
// 	var refString  = randomstring.generate(32);
  
//   	var today = new Date();
//   	var dd = today.getDate();
//   	var mm = today.getMonth()+1; //January is 0!
  
//   	var yyyy = today.getFullYear();
//   	if(dd<10){
//       dd='0'+dd;
//   	} 
//   	if(mm<10){
//       mm='0'+mm;
//   	};
//   	var today = mm+'/'+dd+'/'+ yyyy;

//   	var listing = {
//     refId: refString,
//     data: req.body,
//     created_at: today,
//   	};

//   	listingCollection.save(listing, function(err, newForm) {
//     	if (err) {
//       		return err
//     	} 
//   	})
// })

module.exports = router;