var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/practice1');
var listingCollection = db.collection('listings');
var imageCollection = db.collection('image');
var randomstring = require("randomstring");
var refString  = randomstring.generate(32);
var ObjectId = require('mongodb').ObjectID;

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage : storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Express',
  	message: 'info'
   });
});

//*************  USE THE FOLLOWING CODE WHEN UPLOAD WITHOUT IMAGE ********

// router.post('/', function(req, res, next) {

//   var refString  = randomstring.generate(32);
  
//   var today = new Date();
//   var dd = today.getDate();
//   var mm = today.getMonth()+1; //January is 0!
  
//   var yyyy = today.getFullYear();
//   if(dd<10){
//       dd='0'+dd;
//   } 
//   if(mm<10){
//       mm='0'+mm;
//   } 
//   var today = mm+'/'+dd+'/'+ yyyy;

//   var listing = {
//     refId: refString,
//     data: req.body,
//     created_at: today,
//   }
//   console.log(req.body);
//   console.log(listing);
//   listingCollection.save(listing, function(err, newForm) {
//     if (err) {
//       return err
//     } next()
//   });
// });

// **********************************************************************

router.post('/', upload.any(), function(req, res, next) {
  var refString  = randomstring.generate(32);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  
  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  var today = mm+'/'+dd+'/'+ yyyy;

  var listing = {
    refId: refString,
    data: req.body,
    created_at: today,
  }
  console.log(listing);
  listingCollection.save(listing, function(err, newForm) {
    if (err) {
      return err
    }
  })
  console.log(req.body)

	var files = req.files;
	var imageJSON = {
		refId : refString,
		data: files
	};
	console.log(files);
	imageCollection.save(imageJSON);
	res.redirect('/forms')
})


module.exports = router;
