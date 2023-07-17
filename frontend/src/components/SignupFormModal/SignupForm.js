import '../LoginFormModal/SignupLoginForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../store/session";
import { useEffect } from 'react';
import { loginUser } from '../../store/session';

const SignupForm = ({setShowSignUpModal}) => {
	useEffect(() => {
		// document.getElementById("first-name-input").focus({preventScroll:false, focusVisible: true});
		document.querySelector(".x-close").focus({preventScroll:false, focusVisible: true});
	}, [])
	const dispatch = useDispatch();
	const sessionUser = useSelector((state = {}) => state.session?.user)

	const [firstName, setFirstName] = useState('');	
	const [lastName, setLastName] = useState('');	
	const [birthDate, setBirthDate] = useState('');	
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');	
	const [errors, setErrors] = useState({});
	const [focusInput, setFocusInput] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	

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
				.then(() => {
					setShowSignUpModal(false)
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
				setShowSignUpModal(false)
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

	const scrollBottomForm = (e) => {
		e.preventDefault();
		const form = document.querySelector('.auth-form-body');
		form.scrollTop = form.scrollHeight;
	}

	// if(sessionUser) return <Redirect to="/" />

	return (
		<div className="signup-form" >
			<header className="auth-form-header">
				<button autoFocus className='x-close' onClick={e => setShowSignUpModal(false)}><i class="fa-solid fa-x"></i></button>
				{/* <div className="auth-form-title">Finish signing up</div> */}
				<div className="auth-form-title">Sign up</div>
			</header>
			<div className="auth-form-body">
				<form onSubmit={handleSubmit}>
					{/* NAME STYLING - START */}
					<div className='name-entry-div'>
						<div className='first-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>

									<div className={`floating-placeholder ${firstName === "" ? "" : "input-placeholder-not-empty" }`}>First name</div>
									{/* <div className='floating-placeholder'></div> */}
									<input
										id="first-name-input"
										type="text"
										value={firstName}
										onChange={handleFirstName}
										onFocus={e => setFocusInput("firstName")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "firstName") ? "First name" : ""}
										placeholderColor="green"
										required
									/>
								</div>
							</label>
						</div>
						<div className='last-name-box'>
						<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${lastName === "" ? "" : "input-placeholder-not-empty" }`}>Last name</div>
									<input
										id="last-name-input"
										type="text"
										value={lastName}
										onChange={handleLastName}
										onFocus={e => setFocusInput("lastName")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "lastName") ? "Last name" : ""}
										required
									/>
								</div>
							</label>
						</div>
					</div>
					<div className='input-tooltip'>Make sure it matches the name on your government ID.</div>

					{/* NAME STYLING - END */}

					<br />
					<div className='name-entry-div'>
						<div className=''>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${birthDate === "" ? "" : "input-placeholder-not-empty" }`}>Birthdate</div>
									<input
										id="birthdate"
										type={(focusInput === "birthDate") ? `date`: `text`}
										value={birthDate}
										max={maxDate()}
										onChange={handleBirthdate}
										onFocus={e => setFocusInput("birthDate")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "birthDate") ? "mm/dd/yyyy" : ""}
										// placeholder='Birthdate'
										required
									/>
								</div>
							</label>
						</div>	
					</div>
					{errors.birth_date ? 
						<div className='error-tooltip'><i class="fa-solid fa-circle-exclamation"></i> {errors.birth_date}</div>
						:
						<div className='input-tooltip'>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</div>
					}
					<br />
					{/* <br /> */}


					<div className='name-entry-div'>
						<div className=''>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${email === "" ? "" : "input-placeholder-not-empty" }`}>Email</div>
									<input
										id="email"
										type="text"
										value={email}
										onChange={handleEmail}
										onFocus={e => setFocusInput("email")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "email") ? "Email" : ""}
										required
									/>
								</div>
							</label>
						</div>	
					</div>
					{errors.email ? 
						<div className='error-tooltip'><i class="fa-solid fa-circle-exclamation"></i> Enter a valid email.</div>
						:
						<div className='input-tooltip'>We'll email you trip confirmations and receipts.</div>
					}




					<br />


					<div className='name-entry-div'>
						<div className=''>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${password === "" ? "" : "input-placeholder-not-empty" }`}>Password</div>
									<button type="button" className='show-pw-toggle' onClick={e => setShowPassword(old => !old)}>{showPassword ? 'Hide' : "Show"}</button>
									<input
										id="password"
										type={showPassword ? `text` : `password`}
										value={password}
										onChange={handlePassword}
										onFocus={e => setFocusInput("password")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "password") ? "Password" : ""}
										required
									/>
								</div>
							</label>
						</div>	
					</div>
					{errors.password ? 
						<div className='error-tooltip'><i class="fa-solid fa-circle-xmark"></i> At least 8 characters</div>
						:
						null
					}
					
					<br />
					
					<div className='signup-tooltip'>
						By selecting <span style={{fontWeight: "600"}}>Agree and continue</span>, 
						I agree to Airbnb’s <a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Terms of Service</a>,&nbsp;
						<a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Payments Terms of Service</a>, 
						and <a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Nondiscrimination Policy</a>
						&nbsp;and acknowledge the <a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Privacy Policy</a>.
					</div>

					<br />
					<br />
					<input className="session-btn" type="submit" value="Agree and continue" />
					{/* <br /> */}
					<div className='session-buffer-box'>
						<button className='session-buffer' onClick={scrollBottomForm}><i class="fa-solid fa-chevron-down fa-fade"></i></button>
					</div>
						
					{/* <br /> */}
					<input className="session-btn" type="submit" value="Demo Login" onClick={loginDemo} />
					{/* <p>Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text Filler text </p> */}
				</form>
			</div>
		</div>
	)
}

export default SignupForm;