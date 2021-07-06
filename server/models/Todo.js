const { Schema, model, ObjectId } = require('mongoose');

const Todo = new Schema({
	owner: {
		type: ObjectId,
		ref: 'User',
	},
	text: {
		type: String,
		required: true,
	},
	complited: { type: Boolean, default: false },
	important: { type: Boolean, default: false },
});

module.exports = model('Todo', Todo);
