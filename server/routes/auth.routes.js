const { Router } = require('express');
const User = require('../models/User');

const router = new Router();

router.post('/registration', async (req, res) => {
	try {
		const { email, password } = req.body;
		const candidate = await User.findOne({ email: email });

		if (candidate) {
			return res.status(300).json({ message: 'Такой email уже занят' });
		}

		const user = new User({ email, password });
		await user.save();

		res.status(201).json({ message: 'Пользователь создан' });
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
