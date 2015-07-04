var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function (app) {
	return {
		//CRUD
		read: function (req, res) {
			console.log("Reading Products...");
			Product.find({}, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("Read product result:");
					console.log(result);
					res.json(result);
				}
			})
		},

		create: function (req, res) {
			console.log("creating product...");
			var product = new Product ({name: req.body.name, description: req.body.description, quantityInStock: req.body.initialQuantity, imageUrl: req.body.imageUrl});
			product.save(function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("creation success!");
					console.log(result);
					res.json(result);
				}
			})
		},

		update: function (req, res) {
			// Product.update
		}
	}
})();