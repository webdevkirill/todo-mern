const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

const dbUrl = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.dcozq.mongodb.net/todo?retryWrites=true&w=majority`;
const dbCongif = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true,
};

const start = async () => {
	try {
		await mongoose.connect(dbUrl, dbCongif);
		app.listen(PORT, () => {
			console.log(`Сервер запущен на ${PORT} порту`);
		});
	} catch (err) {
		console.error(err);
	}
};

start();
