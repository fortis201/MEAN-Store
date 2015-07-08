var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');

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
			console.log(req.body);
			var order = new Order ({_customer : req.body.uId});
			order.save(function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("cart has been created");
					console.log(result);
					res.json({oId : result._id});					
				}
			})				
		}, 

		update: function (req, res) {
			console.log(req.body);
			Order.update({_id : req.body.x.oId}, {$push : {_product : req.body.y.productId}, $inc : {orderQuantity : -1*(req.body.y.quantity)}, createdAt : new Date() }, {multi : false}, function (err, result) {
				Customer.update({_id : req.body.x.uId}, {$push : {orders : req.body.y.productId}}, {multi: false}, function (err, c_result) {
					if (err) {
						console.log(err);
					} else {
						console.log(c_result);
						Product.update({_id : req.body.y.productId}, {$inc : {quantityInStock : -1*(req.body.y.quantity)}, $push : {orders : req.body.y.productId}}, {multi : false}, function (err, p_result) {
							if (err) {
								console.log(err);
							} else {
								console.log(p_result);										
							}
						})				
					}
				})
				console.log('order processed!!!');
				console.log(result);
				res.json(result);
			})
		}
	}
})();