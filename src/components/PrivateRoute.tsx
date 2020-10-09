import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import userStore from '../store/user.store';

interface IProps {
	children: React.ReactNode;
	path: string;
}

const PrivateRoute: React.SFC<IProps> = observer(({ children, ...rest }) => {
	const store = React.useContext(userStore);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				store.isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
});

export default PrivateRoute;
