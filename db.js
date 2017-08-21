const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/practice1", (err,connection) => {
	if(err){ console.log(err) }
	
	module.exports.db = connection	
})