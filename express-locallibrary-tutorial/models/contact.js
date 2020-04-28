var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = new Schema(
  {
	owner:String,
	firstname:String,
	lastname:String,
	nickname:String,
	title:String,
	phone:[String],
	mobile:[String],
	email:[String],
	street:String,
	postcode:String,
	city:String,
	country:String,
   }, {collection: "contact", versionKey: false}
);

//Export model
module.exports = mongoose.model('Contact', ContactSchema);