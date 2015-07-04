var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = (function (app) {
	return {
		//CRUD
		read: function (req, res) {
			console.log("Reading Orders...");
			Order.find({}, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("Orders result:");
					console.log(result);
					res.json(result);
				}
			})
		},

		create: function (req, res) {
			console.log("creating new order...");
			var order = new Order ({name: req.body.name, createdAt: new Date()});
			order.save(function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("creation success!");
					console.log(result);
					res.json(result);
				}
			})
		}
	}
})();