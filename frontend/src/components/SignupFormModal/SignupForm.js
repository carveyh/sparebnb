import '../LoginFormModal/SignupLoginForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../store/session";
import { useEffect } from 'react';
import { loginUser } from '../../store/session';

const SignupForm = ({setShowSignUpModal}) => {
	useEffect(() => {
		document.getElementById("first-name-input").focus({preventScroll:false, focusVisible: true});
	}, [])
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
		setEmail(e.target.value);
	}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	}

	const maxDate = () => {
		const month = String(new Date().getMonth() + 1)
		const date = String(new Date().getDate())
		return `${new Date().getFullYear()}-${month.length < 2 ? '0' + month : month}-${date.length < 2 ? '0' + date : date}`
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// if(password === confirmPassword){
			const user = {firstName, lastName, birthDate, email, password}
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
	}

	const loginDemo = (e) => {
		e.preventDefault();
		const user = {email:'demo@user.io', password:'password'}
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

	if(sessionUser) return <Redirect to="/" />

	return (
		<div className="signup-form">
			<header className="auth-form-header">
				<div className='x-close' onClick={e => setShowSignUpModal(false)}><i class="fa-solid fa-xmark"></i></div>
				<div className="auth-form-title">Finish signing up</div>
			</header>
			<div className="auth-form-body">
				<form onSubmit={handleSubmit}>
					{/* NAME STYLING - START */}
					<div className='name-entry-div'>
						<div className='first-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>

									<div className='first-name-floating floating-placeholder'>First name</div>
									{/* <div className='floating-placeholder'></div> */}
									<input
										id="first-name-input"
										type="text"
										value={firstName}
										onChange={handleFirstName}
										// placeholder='First name'
										required
									/>
								</div>
							</label>
						</div>
						<div className='last-name-box'>
						<label className='name-entry-label'>
								<div className='floating-placeholder-container'>

									<div className='last-name-floating floating-placeholder'>Last name</div>
									<input
										id="last-name-input"
										type="text"
										value={lastName}
										onChange={handleLastName}
										// placeholder='Last name'
										required
									/>
								</div>
							</label>
						</div>
					</div>
					<div className='name-tooltip'>Make sure it matches the name on your government ID.</div>



					{/* NAME STYLING - END */}


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
					<br />
					<br />
					<input type="submit" value="Demo Login" onClick={loginDemo} />
					{/* <p>Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text </p> */}
				</form>
			</div>
		</div>
	)
}

export default SignupForm;