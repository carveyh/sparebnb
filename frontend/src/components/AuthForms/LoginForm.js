import './AuthForm.css';

import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session";
import { useEffect } from 'react';

const LoginForm = ({setShowLogInModal}) => {
	useEffect(() => {
		document.getElementById("credential-input").focus({focusVisible:true, preventScroll:false})
	}, [])
	const dispatch = useDispatch();
	
	const [credential, setCredential] = useState('');	
	const [password, setPassword] = useState('');	
	const [errors, setErrors] = useState([]);
	
	const handleCredential = (e) => {
		e.preventDefault();
		setCredential(e.target.value);
	}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {credential, password}
		dispatch(loginUser(user))
			.then(() => {
				setShowLogInModal(false)
			})
			.catch(async (res) => {
				let data;
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text()
				}
				if(data?.errors) setErrors(data.errors)
				else if(data) setErrors([data])
				else setErrors([res.statusText]);
			})

		}
	const loginDemo = (e) => {
		e.preventDefault();
		const user = {email:'demo@user.io', password:'password'}
		dispatch(loginUser(user))
			.then(() => {
				setShowLogInModal(false)
			})
			.catch(async (res) => {
				let data;
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text()
				}
				if(data?.errors) setErrors(data.errors)
				else if(data) setErrors([data])
				else setErrors([res.statusText]);
			})
	}
	
	return (
		<div className="login-form">
			<header className="auth-form-header">
				<button autoFocus className='x-close' onClick={e => setShowLogInModal(false)}><i className="fa-solid fa-x"></i></button>
				{/* <div className="auth-form-title">Finish signing up</div> */}
				<div className="auth-form-title">Log in</div>
			</header>
			<div className="auth-form-body">
				<form>
					<ul>
						{errors.map(error => <li key={error}>{error}</li>)}
					</ul>
					<label>Email (or phone):&nbsp;
						<input
							id="credential-input"
							type="text"
							value={credential}
							onChange={handleCredential}
							required
						/>
					</label>
					<br />
					<br />
					<label>Password:&nbsp;
						<input
							type="password"
							value={password}
							onChange={handlePassword}
							required
						/>
					</label>
					<br />
					<br />
					<input type="submit" value="Login" onClick={handleSubmit} />
					<br />
					<br />
					<input type="submit" value="Demo Login" onClick={loginDemo} />
				</form>
			</div>
		</div>
	)
}

export default LoginForm;