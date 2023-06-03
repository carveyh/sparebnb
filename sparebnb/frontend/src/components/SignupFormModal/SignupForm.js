// import './SignupForm.css';
import '../LoginFormModal/LoginForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../store/session";

const SignupForm = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state = {}) => state.session?.user)

	const [firstName, setFirstName] = useState('');	
	const [lastName, setLastName] = useState('');	
	const [birthDate, setBirthDate] = useState('');	
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');	
	const [errors, setErrors] = useState({});

	const handleFirstName = (e) => {
		e.preventDefault();
		setFirstName(e.target.value);
	}

	const handleLastName = (e) => {
		e.preventDefault();
		setLastName(e.target.value);
	}

	const handleBirthdate = (e) => {
		e.preventDefault();
		setBirthDate(e.target.value);
	}
	
	const handleEmail = (e) => {
		e.preventDefault();
		// console.log(e.target.id);
		setEmail(e.target.value);
	}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	}

	const maxDate = () => {
		const month = String(new Date().getMonth())
		const date = String(new Date().getDate())
		return `${new Date().getFullYear()}-${month.length < 2 ? '0' + month : month}-${date.length < 2 ? '0' + date : date}`
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// if(password === confirmPassword){
			const user = {firstName, lastName, birthDate, email, password}
			// debugger
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
		// } else {
		// 	return setErrors(['Confirm Password must match Password'])
		// }
	}

	if(sessionUser) return <Redirect to="/" />

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<label>First Name:&nbsp;
					<input
						type="text"
						value={firstName}
						onChange={handleFirstName}
						placeholder='Demo'
						required
					/>
				</label>
				<br />
				<br />

				<label>Last Name:&nbsp;
					<input
						type="text"
						value={lastName}
						onChange={handleLastName}
						placeholder='Lition'
						required
					/>
				</label>
				<br />
				<br />

				<label>Birthdate:&nbsp;
					<input
						type="date"
						value={birthDate}
						max={maxDate()}
						onChange={handleBirthdate}
						placeholder='Birthdate'
						required
					/>
				</label>
				{errors.birth_date && 
					<>
						<br />
						<div style={{color:'red'}}>{errors.birth_date}</div>
					</>}
				<br />
				<br />

				<label>Email:&nbsp;
					<input
						id="email"
						type="text"
						value={email}
						onChange={handleEmail}
						required
					/>
				</label>
				{errors.email && 
					<>
						<br />
						<div style={{color:'red'}}>Email {errors.email}</div>
					</>}
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
				{errors.password && 
					<>
						<br />
						<div style={{color:'red'}}>Password {errors.password}</div>
					</>}
				<br />
				<br />
				<input type="submit" value="Signup" />
			</form>
		</div>
	)
}

export default SignupForm;