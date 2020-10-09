import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getToken } from './helpers/auth';
import PrivateRoute from './components/PrivateRoute';

import App from './App';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';

import './index.css';
import * as serviceWorker from './serviceWorker';
import 'mobx-react-lite/batchingForReactDom';

// axios interceptor
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.headers.common['Authorization'] = getToken();
axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App>
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/signin'>
						<Signin />
					</Route>
					<Route path='/signup'>
						<Signup />
					</Route>
					<PrivateRoute path='/dashboard'>
						<Dashboard />
					</PrivateRoute>
				</Switch>
			</App>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
