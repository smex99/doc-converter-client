import React from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../store/user.store';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, 'Mot de passe 8 charactères minimum')
		.max(16, 'Mot de passe 16 charactères maximum')
		.required('Champ obligatoire'),
	email: Yup.string()
		.email('Adresse email invalide')
		.required('Champ obligatoire'),
});

const Signin: React.SFC<RouteComponentProps> = observer(({ history }) => {
	const store = React.useContext(userStore);

	return (
		<div className='signin'>
			<h2 className='main-title'>Signin</h2>
			<Formik
				initialValues={{ email: '', password: '' }}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={signInSchema}
				onSubmit={(values) => {
					const { email, password } = values;
					store.signin({ email, password });
					history.push('/dashboard');
				}}
			>
				{(props) => (
					<Form onSubmit={props.handleSubmit} autoComplete='off'>
						<label htmlFor='email'>E-mail:</label>
						<div className='error'>
							{props.errors.email && <span>{props.errors.email}</span>}
						</div>
						<input
							name='email'
							type='email'
							className='input'
							placeholder='E-mail'
							value={props.values.email}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
						/>

						<label htmlFor='password'>Password:</label>
						<div className='error'>
							{props.errors.password && <span>{props.errors.password}</span>}
						</div>
						<input
							name='password'
							type='password'
							className='input'
							placeholder='Password'
							value={props.values.password}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
						/>
						<button type='submit' className='btn'>
							Signin
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
});

export default withRouter(Signin);
