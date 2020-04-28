//
// SET MODULES HERE
//

// First, we need several modules
// Modules should be added at the beginning

// 1) Express
const express = require('express');
// 2) mongooseJS support
const mongoose = require('mongoose');
// 3) body-parser support for POST commands
const bodyparser = require('body-parser');

//
// END MODULE SET
//

//
// CONNECT TO DBSERVER
//

mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });

//
// END DBSERVER CONNECT
//

//
// SCHEMA CREATION
//

var Schema = mongoose.Schema;

// Create schema for each collection
var contactSchema = new Schema({
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
}, {collection: "contact", versionKey: false});

// map schema to collection
var Contact = mongoose.model('contactmodel', contactSchema);

// this schema can now be called 
// in other nodejs files
module.exports = Contact;

//
// END SCHEMA CREATION
//

//
// SERVER START
//

// This line starts a server that uses
// Express framework with Node.JS
var app = express();

// Register bodyparser with json support
app.use(bodyparser.json());

//
// SERVER START END
//

//
// CONTACT ROUTING 
//

// GET ALL CONTACTS
app.get('/contact', function (req, res, next) {
	Contact.find({}, function(err, results) {
		if (err) throw err;
		console.log(results);
		res.status(200).json(results);
	});
});

// GET ONE CONTACT
app.get('/contact/:id', function (req, res, next) {
	var contactID = req.params.id;
	Contact.find({ _id: contactID }, function(err, results) {
		if (err) throw err;
		console.log(results);
		res.status(200).json(results);
	});
});

app.post('/contact', function (req, res, next) {
	console.log(req.body)
	if(!req.body) {
	return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
	return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length === 0) {
	return res.status(422).json({message:"provide required data"})
	}
	var newcontact = new Contact(req.body);
	newcontact.save(function(err, contact) {
		if (err) throw err;
		console.log('Contact created!');
		res.status(200).json(contact);
	});
});


// kill cat by name
app.delete('/contact/:id', function (req, res, next) {
	var contactID = req.params.id;
	Contact.findOneAndRemove({ _id: contactID }, function(err, results) {
		if (err) throw err;
	res.status(200).json(results);
	});
});

// find one and update
app.put('/contact/:id', function (req, res, next) {
	var contactID = req.params.id;
	if(!req.body) {
	return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
	return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length === 0) {
	return res.status(422).json({message:"provide required data"})
	}
	Contact.findOneAndUpdate(
		{ _id: contactID }, 
		req.body, 
		{ new : true },
		function(err, contact) {
			if (err) throw err;
		res.status(200).json(contact);
		}
	);
	console.log('Contact updated!');
});

//
// ROUTING END
//


//
// NODEJS SERVER START
//

// Start nodeJS server
var server = app.listen(1111, function()
{
	var hostport = server.address().port;
	console.log("Express server is listening");
	console.log("Port is: %s", hostport);
});

//
// NODEJS SERVER START END
//
