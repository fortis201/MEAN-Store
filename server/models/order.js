var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
	_name: {type: Schema.ObjectId, ref: 'User'},
	_product: {type: Schema.ObjectId, ref: 'Product'},
	orderQuantity: Number, 
	createdAt: Date
})

mongoose.model('Order', orderSchema);