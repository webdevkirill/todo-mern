const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const cors = require('./middlewares/cors');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');

const app = express();
const PORT = process.env.PORT || 3005;

const dbUrl = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.dcozq.mongodb.net/todo?retryWrites=true&w=majority`;
const dbCongif = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true,
};

app.use(express.json({ extended: true }));
app.use(cors);
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

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
