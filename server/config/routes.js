var customers = require('../controllers/customers.js');
var products = require('../controllers/products.js');
var orders = require('../controllers/orders.js');

module.exports = function (app) {
	// =====================//
	// --=== Customers ===-- //
	// =====================//
	app.get('/showCustomers', function (req, res) {
		customers.read(req, res);
	});

	app.post('/findOneCust', function (req, res) {
		customers.read_one(req, res);
	})

	app.post('/addCustomer', function (req, res) {
		customers.create(req, res);
	})

	// =====================//
	// --=== Products ===-- //
	// =====================//
	app.get('/showProducts', function (req, res) {
		products.read(req, res);
	})

	app.post('/addProduct', function (req,res) {
		products.create(req, res);
	})

	// =====================//
	// --=== Orders / Cart ===-- //
	// =====================//
	app.post('/showOrders', function (req,res) {
		orders.create(req, res);
	})

	app.post('/addOrder', function (req,res) {
		orders.create(req, res);			
	})
}