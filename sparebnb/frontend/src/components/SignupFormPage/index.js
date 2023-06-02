import './SignupForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../store/session";

const SignupFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state = {}) => state.session?.user)

	const [email, setEmail] = useState('');	
	const [username, setUsername] = useState('');	
	const [password, setPassword] = useState('');	
	const [confirmPassword, setConfirmPassword] = useState('');	
	const [errors, setErrors] = useState([]);

	const handleEmail = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	}

	const handleUsername = (e) => {
		e.preventDefault();
		setUsername(e.target.value);
	}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	}

	const handleConfirmPassword = (e) => {
		e.preventDefault();
		setConfirmPassword(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(password === confirmPassword){
			
			const user = {email, username, password}
			return dispatch(signupUser(user))
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
		} else {
			return setErrors(['Confirm Password must match Password'])
		}
	}

	if(sessionUser) return <Redirect to="/" />

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map(error => <li key={error}>{error}</li>)}
				</ul>
				<label>Email:&nbsp;
					<input
						type="text"
						value={email}
						onChange={handleEmail}
						required
					/>
				</label>
				<br />
				<br />
				<label>Username:&nbsp;
					<input
						type="text"
						value={username}
						onChange={handleUsername}
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
				<label>Confirm Password:&nbsp;
					<input
						type="password"
						value={confirmPassword}
						onChange={handleConfirmPassword}
						required
					/>
				</label>
				<br />
				<br />
				<input type="submit" value="Signup" />
			</form>
		</div>
	)
}

export default SignupFormPage;