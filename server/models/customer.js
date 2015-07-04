var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	password: String,
	createdAt: Date,
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

mongoose.model('Customer', customerSchema);