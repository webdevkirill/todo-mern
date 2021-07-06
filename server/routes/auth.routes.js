const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

			hashedPass = await bcrypt.hash(password, 12);

			const user = new User({ email, password: hashedPass });
			await user.save();

			res.status(201).json({ message: 'Пользователь создан' });
		} catch (err) {
			console.error(err);
		}
	}
);

router.post(
	'/login',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Некорректный пароль').exists(),
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

			const user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ message: 'Такой email не найден' });
			}

			const isSamePass = bcrypt.compare(password, user.password);

			if (!isSamePass) {
				return res.status(400).json({ message: 'Пароль неверный' });
			}

			const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
				expiresIn: '1h',
			});

			res.json({ token, userId: user.id });
		} catch (err) {
			console.error(err);
		}
	}
);

module.exports = router;
