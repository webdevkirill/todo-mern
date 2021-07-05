import React from 'react';
import './authPage.sass';

export default function AuthPage() {
	return (
		<>
			<div className='container'>
				<div className='auth-page'>
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
								<label htmlFor='login-email'>Email</label>
							</div>
							<div className='input-field col s12'>
								<input
									type='password'
									name='password'
									id='login-password'
									className='validate'
								/>
								<label htmlFor='login-password'>Пароль</label>
							</div>
						</div>
						<div className='row'>
							<button className='wawes-effect wawes-light btn blue'>
								Войти
							</button>
							<a href='/' className='btn-outline btn-reg'>
								Нет аккаунта?
							</a>
						</div>
					</form>

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
								<label htmlFor='reg-password'>Пароль</label>
							</div>
						</div>
						<div className='row'>
							<button className='wawes-effect wawes-light btn blue'>
								Регистрация
							</button>
							<a href='/' className='btn-outline btn-reg'>
								Уже зарегистрированы?
							</a>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
