import React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import UserStore from '../../store/user.store';

import Logo from '../../assets/logo.png';
import './Navbar.css';

interface IProps extends RouteComponentProps {
	isAuth: boolean;
}

const Navbar: React.SFC<IProps> = observer(({ history, isAuth }) => {
	const store = React.useContext(UserStore);

	React.useEffect(() => {
		var prevScrollpos = window.pageYOffset;
		window.onscroll = function () {
			var currentScrollPos = window.pageYOffset;
			var navbar = document.getElementById('topnav');

			if (prevScrollpos > currentScrollPos) {
				if (navbar !== null) navbar.style.top = '0';
			} else {
				if (navbar !== null) navbar.style.top = '-51px';
			}
			prevScrollpos = currentScrollPos;
		};
	}, []);

	const handleLogout = (event: React.MouseEvent) => {
		event.preventDefault();
		history.push('/');
		store.signout();
	};

	return (
		<div className='topnav' id='topnav'>
			<div className='logo' onClick={() => history.push('/')}>
				<img src={Logo} height='100%' width='auto' alt='logo' />
			</div>

			<div className='brand'>
				<h2>Image to Document Converter.io</h2>
			</div>

			{!isAuth && (
				<NavLink to='/signin'>
					<i className='fa fa-fw fa-sign-in' />
					Signin
				</NavLink>
			)}

			{!isAuth && (
				<NavLink to='/signup'>
					<i className='fa fa-fw fa-sign-out' />
					Signup
				</NavLink>
			)}

			{isAuth && (
				<NavLink to='/logout' onClick={(e) => handleLogout(e)}>
					<i className='fa fa-fw fa-sign-out' />
					Logout
				</NavLink>
			)}

			{isAuth && (
				<NavLink to='/dashboard'>
					<i className='fa fa-fw fa-sign-out' />
					My Account
				</NavLink>
			)}
		</div>
	);
});

export default withRouter(Navbar);
