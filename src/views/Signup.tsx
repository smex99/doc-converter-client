import React from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../store/user.store';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
	firstName: Yup.string().required('Champ obligatoire'),
	lastName: Yup.string().required('Champ obligatoire'),
	email: Yup.string()
		.email('adresse email invalide')
		.required('Champ obligatoire'),
	password: Yup.string()
		.min(8, 'Mot de passe 8 charactères minimum')
		.max(14, 'Mot de passe 16 charactères maximum')
		.required('Champ obligatoire'),
});

const Signup: React.SFC<RouteComponentProps> = observer(({ history }) => {
	const store = React.useContext(userStore);

	return (
		<div className='signin'>
			<h2 className='main-title'>Signup</h2>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					password: '',
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={signUpSchema}
				onSubmit={(values) => {
					const { firstName, lastName, email, password } = values;
					store.signup({ firstName, lastName, email, password });
					history.push('/dashboard');
				}}
			>
				{(props) => (
					<Form onSubmit={props.handleSubmit} autoComplete='off'>
						<label htmlFor='firstName'>First Name:</label>
						<div className='error'>
							{props.errors.firstName && <span> {props.errors.firstName}</span>}
						</div>
						<input
							name='firstName'
							type='text'
							placeholder='First Name'
							className='input'
							value={props.values.firstName}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
						/>

						<label htmlFor='lastName'>Last Name:</label>
						<div className='error'>
							{props.errors.lastName && <span>{props.errors.lastName}</span>}{' '}
						</div>
						<input
							name='lastName'
							type='text'
							placeholder='Last Name'
							className='input'
							value={props.values.lastName}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
						/>

						<label htmlFor='email'>E-mail:</label>
						<div className='error'>
							{props.errors.email && <span>{props.errors.email}</span>}
						</div>
						<input
							name='email'
							type='email'
							placeholder='E-mail'
							className='input'
							value={props.values.email}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
						/>

						<label htmlFor='password'>Password:</label>
						<div className='error'>
							{props.errors.password && <span>{props.errors.password}</span>}
						</div>
						<input
							id='password'
							name='password'
							type='password'
							placeholder='Password'
							className='input'
							value={props.values.password}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
						/>
						<button type='submit' className='btn'>
							Signup
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
});

export default withRouter(Signup);
