import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import userStore from './store/user.store';

import './App.css';

const App: React.SFC<React.ReactNode> = observer((props) => {
	const store = React.useContext(userStore);
	autorun(() => {
		store.getUserFromToken();
	});

	return (
		<div className='app'>
			<Navbar isAuth={store.isAuthenticated} />
			<div className='main' id='main'>
				<div className='container'>{props.children}</div>
			</div>
			<Footer />
		</div>
	);
});

export default App;
