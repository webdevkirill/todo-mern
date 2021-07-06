import React, { useContext } from 'react';
import './navbar.sass';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
	const { logout, isLogin } = useContext(AuthContext);

	return (
		<nav>
			<div className='nav-wrapper navbar blue'>
				<a href='/' className='brand-logo'>
					MERN Todo App
				</a>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					{isLogin && (
						<li>
							<a href='/' onClick={logout}>
								Выйти
							</a>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
}
