const { Router } = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const router = new Router();

router.post(
	'/registration',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Некорректный пароль').isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ errors: errors.array(), message: errors[0] });
			}

			const { email, password } = req.body;
			const candidate = await User.findOne({ email: email });

			if (candidate) {
				return res
					.status(300)
					.json({ message: 'Такой email уже занят' });
			}

			const user = new User({ email, password });
			await user.save();

			res.status(201).json({ message: 'Пользователь создан' });
		} catch (err) {
			console.error(err);
		}
	}
);

module.exports = router;
