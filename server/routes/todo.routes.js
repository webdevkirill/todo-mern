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

module.exports = router;
