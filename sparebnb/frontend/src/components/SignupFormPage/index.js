// import './SignupForm.css';
import '../LoginFormModal/LoginForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../store/session";

const SignupFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state = {}) => state.session?.user)

	const [firstName, setFirstName] = useState('');	
	const [lastName, setLastName] = useState('');	
	const [birthDate, setBirthDate] = useState('');	
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');	
	// const [confirmPassword, setConfirmPassword] = useState('');	
	const [errors, setErrors] = useState([]);

	const handleFirstName = (e) => {
		e.preventDefault();
		setFirstName(e.target.value);
	}

	const handleLastName = (e) => {
		e.preventDefault();
		setLastName(e.target.value);
	}

	const handleBirthdate = (e) => {
		// console.log("max",e.target.max)
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

	// const handleConfirmPassword = (e) => {
	// 	e.preventDefault();
	// 	setConfirmPassword(e.target.value);
	// }
	const maxDate = () => {
		const month = String(new Date().getMonth())
		const date = String(new Date().getDate())
		return `${new Date().getFullYear()}-${month.length < 2 ? '0' + month : month}-${date.length < 2 ? '0' + date : date}`
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// if(password === confirmPassword){
			// console.log(birthDate)
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
				// debugger
				if(data?.errors) setErrors(data.errors)
				else if(data) setErrors([data])
				else setErrors([res.statusText]);
				// debugger
				
			})
		// } else {
		// 	return setErrors(['Confirm Password must match Password'])
		// }
	}

	if(sessionUser) return <Redirect to="/" />

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<ul>
					{/* {errors.map(error => <li key={error}>{error}</li>)} */}
					{Object.entries(errors).map(error => <li key={error[0]}>{error[0]} - {error[1]}</li>)}
				</ul>



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
						// max={`2023-06-12`}
						onChange={handleBirthdate}
						placeholder='Birthdate'
						required
					/>
				</label>
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
				{/* <label>Confirm Password:&nbsp;
					<input
						type="password"
						value={confirmPassword}
						onChange={handleConfirmPassword}
						required
					/>
				</label>
				<br />
				<br /> */}
				<input type="submit" value="Signup" />
			</form>
		</div>
	)
}

export default SignupFormPage;