const { Router } = require('express');
const Todo = require('../models/Todo');

const router = new Router();

router.post('/add', async (req, res) => {
	try {
		const { text, userId } = req.body;

		const todo = await new Todo({
			text,
			owner: userId,
			complited: false,
			important: false,
		});

		await todo.save();
		res.json(todo);
	} catch (err) {
		console.error(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const { userId } = req.query;
		const todos = await Todo.find({ owner: userId });
		res.json(todos);
	} catch (err) {
		console.error(err);
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const todo = await Todo.findOneAndDelete({ _id: req.params.id });
		res.json(todo);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
