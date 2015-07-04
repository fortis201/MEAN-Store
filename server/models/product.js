var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
	name: String,
	description: String,
	quantityInStock: Number, 
	imageUrl: String,
	order: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

mongoose.model('Product', productSchema);