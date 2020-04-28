var contact = require('../models/contact');

// http://localhost:3000/contact
//router.get('/', contact_controller.contact_get_all);
exports.contact_get_all = function(req,res,next) {
		contact.find({}, function(err, results) {
		if (err) throw err;
		console.log(results);
		res.status(200).json(results);
	});

}

// http://localhost:3000/contact/<id>
//router.get('/:id', contact_controller.contact_get_one);
exports.contact_get_one = function(req,res,next) {

}

// http://localhost:3000/contact
//router.post('/', contact_controller.contact_create_one);
exports.contact_create_one = function(req,res,next) {
	
}

// http://localhost:3000/contact/<id>
//router.delete('/:id', contact_controller.contact_delete_one);
exports.contact_delete_one = function(req,res,next) {
	
}

// http://localhost:3000/contact/<id>
//router.put('/:id', contact_controller.contact_update_one);
exports.contact_update_one = function(req,res,next) {
	
}
