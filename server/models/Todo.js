const { Schema, model, ObjectId } = require('mongoose');

const Todo = new Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = model('User', Todo);
