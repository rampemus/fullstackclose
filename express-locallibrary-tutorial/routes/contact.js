var express = require('express');
var router = express.Router();

// Require controller modules.
var contact_controller = require('../controllers/contactController');

/// CONTACT ROUTES ///

// http://localhost:3000/contact
router.get('/', contact_controller.contact_get_all);

// http://localhost:3000/contact/<id>
router.get('/:id', contact_controller.contact_get_one);

// http://localhost:3000/contact
router.post('/', contact_controller.contact_create_one);

// http://localhost:3000/contact/<id>
router.delete('/:id', contact_controller.contact_delete_one);

// http://localhost:3000/contact/<id>
router.put('/:id', contact_controller.contact_update_one);

module.exports = router;