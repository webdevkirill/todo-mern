import React, { useContext, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './authPage.sass';
import { AuthContext } from '../../context/AuthContext';

export default function AuthPage() {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const { login } = useContext(AuthContext);

	const inputChangeHandler = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const registerHandler = async () => {
		try {
			await axios.post(
				'http://localhost:3005/api/auth/registration',
				form,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		} catch (err) {
			console.error(err);
		}
	};

	const loginHandler = async () => {
		try {
			await axios
				.post('http://localhost:3005/api/auth/login', form, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then(({ data }) => {
					login(data.token, data.userId);
				});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<BrowserRouter>
			<Switch>
				<>
					<div className='container'>
						<div className='auth-page'>
							<Route path='/login'>
								<h3>Вход</h3>
								<form
									className='form form-login'
									onSubmit={(e) => e.preventDefault()}
								>
									<div className='row'>
										<div className='input-field col s12'>
											<input
												type='email'
												name='email'
												id='login-email'
												className='validate'
												onChange={inputChangeHandler}
											/>
											<label htmlFor='login-email'>
												Email
											</label>
										</div>
										<div className='input-field col s12'>
											<input
												type='password'
												name='password'
												id='login-password'
												className='validate'
												onChange={inputChangeHandler}
											/>
											<label htmlFor='login-password'>
												Пароль
											</label>
										</div>
									</div>
									<div className='row'>
										<button
											className='waves-effect waves-light btn blue'
											onClick={loginHandler}
										>
											Войти
										</button>
										<Link
											to='/registration'
											className='btn-outline btn-reg'
										>
											Нет аккаунта?
										</Link>
									</div>
								</form>
							</Route>

							<Route path='/registration'>
								<h3>Регистрация</h3>
								<form
									className='form form-login'
									onSubmit={(e) => e.preventDefault()}
								>
									<div className='row'>
										<div className='input-field col s12'>
											<input
												type='email'
												name='email'
												id='reg-email'
												onChange={inputChangeHandler}
												className='validate'
											/>
											<label htmlFor='reg-email'>
												Email
											</label>
										</div>
										<div className='input-field col s12'>
											<input
												type='password'
												name='password'
												id='reg-password'
												onChange={inputChangeHandler}
												className='validate'
											/>
											<label htmlFor='reg-password'>
												Пароль
											</label>
										</div>
									</div>
									<div className='row'>
										<button
											className='waves-effect waves-light btn blue'
											onClick={registerHandler}
										>
											Регистрация
										</button>
										<Link
											to='/login'
											className='btn-outline btn-reg'
										>
											Уже зарегистрированы?
										</Link>
									</div>
								</form>
							</Route>
						</div>
					</div>
				</>
			</Switch>
		</BrowserRouter>
	);
}
