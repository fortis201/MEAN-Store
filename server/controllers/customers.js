var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
// var current_customer;
module.exports = (function (app) {
	return {
		//CRUD

		read: function (req, res) {
			console.log("Reading Customers...");
			Customer.find({}, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("Read customer result:");
					console.log(result);
					res.json(result);
				}
			})
		},

		create: function (req, res) {
			Customer.find({name: req.body.name}, function (err, result) {
				if (err) {
					console.log(err);
				} else if (result.length > 0) {
					res.json({err_message: "already exists"});
				} else {
					console.log("creating customer...");
					var customer = new Customer ({name: req.body.name, createdAt: new Date()});
					customer.save(function (err, result) {
						if (err) {
							console.log(err);
						} else {
							console.log("creation success!");
							console.log(result);
							// current_customer = result;
							res.json(result);
						}
					})					
				}
			})
		},

		read_logged_in_user: function (req, res) {

		}

		// update: function (req, res) {
		// 	Customer.
		// }
	}
})();