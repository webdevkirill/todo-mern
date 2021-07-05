import React from 'react';
import './navbar.sass';

export default function Navbar() {
	return (
		<nav>
			<div className='nav-wrapper navbar blue'>
				<a href='/' class='brand-logo'>
					MERN Todo App
				</a>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					<li>
						<a href='/'>Войти</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
