import { createContext } from 'react';
import { action, decorate, observable, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { saveAs } from 'file-saver';
import { setToken, getToken, removeToken } from '../helpers/auth';
import { IAccount } from '../models/account';
import { IRegisterAccount } from '../models/registration';

interface IUser {
	firstName?: string;
	lastName?: string;
	email?: string;
	confirmed?: boolean;
	isAdmin?: boolean;
	password?: string;
}

class UserStore {
	isLoading = false;
	isAuth = false;
	userId = '';
	user: IUser = {};
	error = '';
	status = '';
	text = '';
	attachementName = '';
	attachementType = '';
	attachementContent = '';

	get isAuthenticated() {
		return this.isAuth;
	}

	async signin(account: IAccount) {
		const response = await axios.post('/auth/signin', account);
		this.user = response.data.user;
		setToken(response.data.token);
		this.isAuth = true;
	}

	async signup(registration: IRegisterAccount) {
		const response = await axios.post('/auth/signup', registration);
		this.user = response.data.user;
		setToken(response.data.token);
		this.isAuth = true;
	}

	async getUserFromAPI() {
		const response = await axios.get(`/users/${this.userId}`);
		this.user = response.data;
	}

	signout() {
		removeToken();
		this.isAuth = false;
		this.userId = '';
		this.user = {};
	}

	async upload(formData: FormData) {
		const response = await axios.post('/upload/ocr', formData);
		this.attachementName = response.data.name;
		this.text = response.data.text;
		this.isLoading = false;
	}

	download(name: string, type: string) {
		axios
			.get(`/attachment/?name=${name}&type=${type}`)
			.then((res) => {
				let blob;

				if (type === 'pdf') {
					blob = new Blob([res.data], {
						type: 'application/pdf;charset=utf-8',
					});

					saveAs(blob, `converted.${type}`);
				}

				if (type === 'txt') {
					blob = new Blob([res.data], {
						type: 'text/plain;charset=utf-8',
					});

					saveAs(blob, `converted.${type}`);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getUserFromToken() {
		const token = getToken();
		if (token) {
			this.isAuth = true;
			let decoded: any = jwtDecode(token);
			this.userId = decoded.sub;
		} else {
			// throw new Error('User token not found !');
		}
	}
}

decorate(UserStore, {
	isAuthenticated: computed,
	isLoading: observable,
	isAuth: observable,
	user: observable,
	userId: observable,
	error: observable,
	status: observable,
	text: observable,
	attachementName: observable,
	attachementType: observable,
	attachementContent: observable,
	signin: action,
	signup: action,
	upload: action,
	download: action,
	signout: action,
});

export default createContext(new UserStore());
