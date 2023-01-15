const mongoose = require('mongoose');


const EmployeSchema = mongoose.Schema({
	nom:{
		type: String,
		require: true
	},
	description:{
		type: String, 
		require: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Employe',EmployeSchema);