var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
	name: String,
	createdAt: Date,
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

mongoose.model('Customer', customerSchema);