import '../AuthForms/AuthForm.css';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { signupUser } from "../../store/session";
import { loginUser } from '../../store/session';

const SignupForm = ({setShowSignUpModal, setShowLogInModal}) => {

	const dispatch = useDispatch();
	const sessionUser = useSelector((state = {}) => state.session?.user)

	const [firstName, setFirstName] = useState('');	
	const [lastName, setLastName] = useState('');	
	// const [birthDate, setBirthDate] = useState('');	
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');	
	const [errors, setErrors] = useState({});
	const [focusInput, setFocusInput] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [formIncomplete, setFormIncomplete] = useState(false);
	const [passwordNotNameEmail, setPasswordNotNameEmail] = useState(false);
	const [passwordMinLength, setPasswordMinLength] = useState(false);
	const [passwordNumSymbol, setPasswordNumSymbol] = useState(false);
	const [initialBadPassword, setInitialBadPassword] = useState(false);
	
	const signupRef = useRef(null);
	const demoLoginRef = useRef(null);
	const loginBtnRef = useRef(null);
	const activeBtnRef = useRef(null);
	
	const checkPasswordStrength = useCallback(() => {
		if(!((firstName.length > 0 && password.toLowerCase().includes(firstName)) || (lastName.length > 0 && password.toLowerCase().includes(lastName)) || (email.length > 0 && password.toLowerCase().includes(email)))) {
			setPasswordNotNameEmail(true);
		} else setPasswordNotNameEmail(false)
		if(password.length >= 8){
			setPasswordMinLength(true);
		} else setPasswordMinLength(false)
		const numRegex = new RegExp('[0-9]')
		const symbolRegex = new RegExp('[`~!@#$%^&*()-_=+;<,>\.\[\]\\\/?\'"]')
		if(numRegex.test(password) || symbolRegex.test(password)) {
			setPasswordNumSymbol(true);
		} else setPasswordNumSymbol(false)
	}, [firstName, lastName, email, password, passwordMinLength, passwordNotNameEmail, passwordNumSymbol])

	const passwordOK = () => {
		return passwordMinLength && passwordNotNameEmail && passwordNumSymbol;
	}

	const emailOK = () => {
		// validate using regex
		const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/, "gm");
		return emailRegex.test(email);
	}

	useEffect(() => {
		return () => {
			document.removeEventListener("mouseup", mouseUpAuthBtn);
		}
	}, [])

	useEffect(() => {
		checkPasswordStrength();
	}, [password, firstName, lastName, email, password])

	const handleFirstName = (e) => {
		e.preventDefault();
		setFirstName(e.target.value);
	}

	const handleLastName = (e) => {
		e.preventDefault();
		setLastName(e.target.value);
	}

	// const handleBirthdate = (e) => {
	// 	e.preventDefault();
	// 	setBirthDate(e.target.value);
	// }
	
	const handleEmail = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
		setInitialBadPassword(false);
	}



	const mouseDownAuthBtn = (e) => {
		e.preventDefault();
		e.currentTarget.classList.add("mouse-down-session-btn");
		activeBtnRef.current = e.currentTarget;
		document.addEventListener("mouseup", mouseUpAuthBtn) //add/rmv elisteners require exact reference...so separate function names
	}

	const mouseUpAuthBtn = (e) => {
		e.preventDefault();
		document.removeEventListener("mouseup", mouseUpAuthBtn);
		activeBtnRef.current.classList.remove("mouse-down-session-btn");
		if(e.target === activeBtnRef.current){
			if(e.target === signupRef.current) {
				handleSubmit(e);
				return;
			}
			if(e.target === demoLoginRef.current) {
				loginDemo(e);
				return;
			}
			if(e.target === loginBtnRef.current) {
				setShowLogInModal(true)
				setShowSignUpModal(false)
				return;
			}
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(firstName === "" || lastName === "" || email === "" || password === "" || !passwordOK()){
			setFormIncomplete(true)
			if(!passwordOK()){
				setInitialBadPassword(true);
			}
			return;
		}
		const user = {firstName, lastName, birthDate:"01-01-1990", email, password} // since birthdate removed
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
		setFirstName('Demo');
		setLastName('Lition');
		setEmail('demo@user.io');
		setPassword('dprian83');
		const user = {credential:'demo@user.io', password:'dprian83'}
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

	const nameToolTip = () => {
		if(formIncomplete && firstName === "") {
			return <div className='error-tooltip'><i className="fa-solid fa-circle-exclamation"></i> First name is required.</div>
		}
		if(formIncomplete && lastName === "") {
			return <div className='error-tooltip'><i className="fa-solid fa-circle-exclamation"></i> Last name is required.</div>
		}
		return <div className='input-tooltip'>Make sure it matches the name on your government ID.</div>
	}

	const emailToolTip = () => {
		if(formIncomplete && !emailOK()) {
			return <div className='error-tooltip'><i className="fa-solid fa-circle-exclamation"></i> Enter a valid email.</div>
		}
		if(formIncomplete && email === "") {
			return <div className='error-tooltip'><i className="fa-solid fa-circle-exclamation"></i> Email is required.</div>
		}
		return <div className='input-tooltip'>We'll email you trip confirmations and receipts.</div>
	}

	const passwordToolTip = () => {
		return (
		<>
			{(initialBadPassword) && <div className={`error-tooltip `}><i className="fa-solid fa-circle-exclamation"></i> Password is required.</div>}
			<div className='password-errors-container'>
				{(formIncomplete) && <div className={`error-tooltip ${!passwordOK() ? `error-password-tooltip` : `ok-password-tooltip`}`}><i className={`fa-solid ${!passwordOK() ? "fa-circle-xmark " : "fa-circle-check"}`}></i>{` Password strength: ${passwordOK() ? `good` : `weak`}`}</div>}
				{!passwordOK() && <>
				{(formIncomplete) && <div className={`error-tooltip ${!passwordNotNameEmail || password === "" ? `error-password-tooltip` : `ok-password-tooltip`}`}><i className={`fa-solid ${!passwordNotNameEmail || password === "" ? "fa-circle-xmark " : "fa-circle-check"}`}></i> Can't contain your name or email address</div>}
				{(formIncomplete) && <div className={`error-tooltip ${!passwordMinLength ? `error-password-tooltip` : `ok-password-tooltip`}`}><i className={`fa-solid ${!passwordMinLength ? "fa-circle-xmark " : "fa-circle-check"}`}></i> At least 8 characters</div>}
				{(formIncomplete) && <div className={`error-tooltip ${!passwordNumSymbol ? `error-password-tooltip` : `ok-password-tooltip`}`}><i className={`fa-solid ${!passwordNumSymbol ? "fa-circle-xmark " : "fa-circle-check"}`}></i> Contains a number or symbol</div>}
				</>}
			</div>
		</>
		)
	}

	return (
		<div className="signup-form" >
			<header className="auth-form-header">
				<button autoFocus className='x-close' onClick={e => setShowSignUpModal(false)}><i className="fa-solid fa-x"></i></button>
				<div className="auth-form-title">Sign up</div>
			</header>
			<div className="auth-form-body">
				<form autoComplete='off' onSubmit={e => e.preventDefault()}>
					{/* NAME STYLING - START */}
					<div className={`${(formIncomplete && (firstName === "" || lastName === "")) ? `error-entry-div` : `name-entry-div`}`}>
						<div className='first-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									{/* <div className={`floating-placeholder ${firstName === "" ? "" : "input-placeholder-not-empty" }`}>First name</div> */}
									<div className={`floating-placeholder ${(formIncomplete && (firstName === "")) ? "input-placeholder-error" : firstName === "" ? "" : "input-placeholder-not-empty" }`}>First name</div>
									<input
										// id="first-name-input"
										className={`first-name-input ${(formIncomplete && firstName === "") && `session-error-input`}`}
										type="text"
										value={firstName}
										onChange={handleFirstName}
										onFocus={e => setFocusInput("firstName")}
										onBlur={e =>setFocusInput(null)}
										// placeholder={(focusInput === "firstName") ? "First name" : ""}
										placeholder={(focusInput === "firstName" || (formIncomplete && (firstName === ""))) ? "First name" : ""}
										placeholderColor="green"
										required
									/>
								</div>
							</label>
						</div>
						<div className='last-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									{/* <div className={`floating-placeholder ${lastName === "" ? "" : "input-placeholder-not-empty" }`}>Last name</div> */}
									<div className={`floating-placeholder ${(formIncomplete && (lastName === "")) ? "input-placeholder-error" : lastName === "" ? "" : "input-placeholder-not-empty" }`}>Last name</div>
									<input
										// id="last-name-input"
										className={`last-name-input ${(formIncomplete && lastName === "") && `session-error-input`}`}
										type="text"
										value={lastName}
										onChange={handleLastName}
										onFocus={e => setFocusInput("lastName")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "lastName" || (formIncomplete && (lastName === ""))) ? "Last name" : ""}
										required
									/>
								</div>
							</label>
						</div>
					</div>
					{/* <div className='input-tooltip'>Make sure it matches the name on your government ID.</div> */}
					{nameToolTip()}
					<br />

					{/* NAME STYLING - END */}

					<div className={`${(formIncomplete && (email === "" || !emailOK())) ? `error-entry-div` : `name-entry-div`}`}>
						<div className=''>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									{/* <div className={`floating-placeholder ${email === "" ? "" : "input-placeholder-not-empty" }`}>Email</div> */}
									<div className={`floating-placeholder ${(formIncomplete && (email === "" || !emailOK())) ? "input-placeholder-error" : email === "" ? "" : "input-placeholder-not-empty" }`}>Email</div>
									<input
										// id="email"
										className={`email ${(formIncomplete && (email === "" || !emailOK())) && `session-error-input`}`}
										type="text"
										value={email}
										onChange={handleEmail}
										onFocus={e => setFocusInput("email")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "email" || (formIncomplete && (email === ""))) ? "Email" : ""}
										required
									/>
								</div>
							</label>
						</div>	
					</div>
					{emailToolTip()}

					<br />

					<div className={`${(formIncomplete && initialBadPassword) ? `error-entry-div` : `name-entry-div`}`}>
						<div className=''>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${ initialBadPassword ? "input-placeholder-error" : password === "" ? "" : "input-placeholder-not-empty" }`}>Password</div>
									
									<input
										// id="password"
										className={`password ${(formIncomplete && initialBadPassword) && `session-error-input`}`}
										type={showPassword ? `text` : `password`}
										value={password}
										onChange={handlePassword}
										onFocus={e => setFocusInput("password")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "password" || (initialBadPassword && (password === ""))) ? "Password" : ""}
										required
										maxLength={20}
									/>
									<button type="button" className={`show-pw-toggle ${initialBadPassword && `show-pw-toggle-pw-error`}`} onClick={e => setShowPassword(old => !old)}>{showPassword ? 'Hide' : "Show"}</button>
								</div>
							</label>
						</div>	
					</div>
					{passwordToolTip()}
					
					<br />
					
					<div className='signup-tooltip'>
						By selecting <span style={{fontWeight: "600"}}>Agree and continue</span>, 
						I agree to Airbnb’s <a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Terms of Service</a>,&nbsp;
						<a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Payments Terms of Service</a>, 
						and <a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Nondiscrimination Policy</a>
						&nbsp;and acknowledge the <a target="_blank" className="signup-link" href="https://www.linkedin.com/in/carvey-hor/">Privacy Policy</a>.
					</div>

					<div className='auth-session-btns'>
						<button className="session-btn" type="button" ref={signupRef} onMouseDown={mouseDownAuthBtn} onMouseUp={e => e.preventDefault()}>Agree and continue</button>
						<button className="session-btn" type="button" ref={demoLoginRef} onMouseDown={mouseDownAuthBtn} >Demo log in</button>
					</div>
					<div className='signup-tooltip switch-auth-modal'>
						Already have an account? <span className="signup-link" ref={loginBtnRef} onMouseDown={mouseDownAuthBtn} >Log in</span>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignupForm;