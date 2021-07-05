import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './authPage.sass';

export default function AuthPage() {
	return (
		<BrowserRouter>
			<Switch>
				<div className='container'>
					<div className='auth-page'>
						<Route path='/login'>
							<h3>Вход</h3>
							<form className='form form-login'>
								<div className='row'>
									<div className='input-field col s12'>
										<input
											type='email'
											name='email'
											id='login-email'
											className='validate'
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
										/>
										<label htmlFor='login-password'>
											Пароль
										</label>
									</div>
								</div>
								<div className='row'>
									<button className='wawes-effect wawes-light btn blue'>
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
							<form className='form form-login'>
								<div className='row'>
									<div className='input-field col s12'>
										<input
											type='email'
											name='email'
											id='reg-email'
											className='validate'
										/>
										<label htmlFor='reg-email'>Email</label>
									</div>
									<div className='input-field col s12'>
										<input
											type='password'
											name='password'
											id='reg-password'
											className='validate'
										/>
										<label htmlFor='reg-password'>
											Пароль
										</label>
									</div>
								</div>
								<div className='row'>
									<button className='wawes-effect wawes-light btn blue'>
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
			</Switch>
		</BrowserRouter>
	);
}
