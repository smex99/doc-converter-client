import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';

export const setToken = (token: string) =>
	localStorage.setItem('token', `Bearer ${token}`);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

export const isTokenExpired = (token: string) => {
	try {
		const decoded: any = jwtDecode(token);
		if (decoded.exp < Date.now() / 1000) {
			return true;
		} else return false;
	} catch (err) {
		throw new Error('access token expired !');
	}
};

export const isAuthenticatedUser = () => {
	let token = getToken();
	if (isEmpty(token)) {
		return false;
	} else return true;
};

export const decodeToken = () => {
	let token = getToken();
	if (token) {
		let decoded: any = jwtDecode(token);

		// return the userId encoded in the token
		return decoded.sub;
	} else {
		throw new Error('app token not found.');
	}
};
