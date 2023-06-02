import './LoginForm.css';

import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session";
// import { Redirect } from "react-router-dom";

const LoginForm = () => {
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
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map(error => <li key={error}>{error}</li>)}
				</ul>
				<label>Email (or phone):&nbsp;
					<input
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
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default LoginForm;