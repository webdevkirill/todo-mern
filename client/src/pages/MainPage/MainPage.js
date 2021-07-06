import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './mainPage.sass';
import { AuthContext } from '../../context/AuthContext';

export default function MainPage() {
	const [text, setText] = useState('');
	const { userId } = useContext(AuthContext);
	const [todos, setTodos] = useState([]);

	const createTodo = async () => {
		if (!text) return false;
		try {
			await axios
				.post(
					'http://localhost:3005/api/todo/add',
					{
						text,
						userId,
					},
					{
						headers: { 'Content-Type': 'application/json' },
					}
				)
				.then((response) => {
					setTodos([...todos, response.data]);
					setText('');
				});
		} catch (err) {
			console.error(err);
		}
	};

	const getTodos = useCallback(async () => {
		try {
			await axios
				.get('http://localhost:3005/api/todo', {
					headers: {
						'Content-Type': 'application/json',
					},
					params: { userId },
				})
				.then((response) => {
					setTodos(response.data);
				});
		} catch (err) {
			console.error(err);
		}
	}, [userId]);

	const removeTodo = async (id) => {
		try {
			await axios
				.delete(
					`http://localhost:3005/api/todo/delete/${id}`,
					{
						id,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then(() => {
					getTodos();
				});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getTodos();
	}, [getTodos]);

	return (
		<div className='container'>
			<div className='main-page'>
				<h4>Добавить задачу</h4>
				<form
					className='form form-login'
					onSubmit={(e) => e.preventDefault()}
				>
					<div className='row'>
						<div className='input-field col s12'>
							<input
								type='text'
								id='task'
								name='task'
								className='validate'
								value={text}
								onChange={(e) => setText(e.target.value.trim())}
							/>
							<label htmlFor='task'>Задача</label>
						</div>
					</div>
					<div className='row'>
						<button
							className='waves-effect waves-light btn blue'
							onClick={createTodo}
						>
							Добавить
						</button>
					</div>
				</form>

				<h3>Активные задачи</h3>
				<div className='todos'>
					{todos.map((todo, idx) => (
						<div className='row flex todos-item' key={todo._id}>
							<div className='col todos-num'>{idx + 1}</div>
							<div className='col todos-text'>{todo.text}</div>
							<div className='col todos-buttons'>
								<i className='material-icons blue-text'>
									check
								</i>
								<i className='material-icons orange-text'>
									warning
								</i>
								<i
									className='material-icons red-text'
									onClick={() => removeTodo(todo._id)}
								>
									delete
								</i>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
