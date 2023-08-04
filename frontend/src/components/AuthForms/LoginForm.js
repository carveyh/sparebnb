import './AuthForm.css';

import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session";
import { useEffect } from 'react';
import { useRef } from 'react';

const LoginForm = ({setShowSignUpModal, setShowLogInModal}) => {
	useEffect(() => {
		// document.querySelector(".x-close").focus({focusVisible:true, preventScroll:false})
	}, [])
	const dispatch = useDispatch();
	
	const [focusInput, setFocusInput] = useState(null);
	const [credential, setCredential] = useState('');	
	const [password, setPassword] = useState('');	
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState([]);
	const [formIncomplete, setFormIncomplete] = useState(false);
	const [initialBadPassword, setInitialBadPassword] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	const loginRef = useRef(null);
	const demoLoginRef = useRef(null);
	const signupBtnRef = useRef(null);
	const activeBtnRef = useRef(null);
	
	const handleCredential = (e) => {
		e.preventDefault();
		setCredential(e.target.value);
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
			if(e.target === loginRef.current) {
				handleSubmit(e);
				return;
			}
			if(e.target === demoLoginRef.current) {
				loginDemo(e);
				return;
			}
			if(e.target === signupBtnRef.current) {
				setShowSignUpModal(true)
				setShowLogInModal(false)
				return;
			}
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(credential === "" || password === ""){
			setFormIncomplete(true)
			setInitialBadPassword(true);
			// if(!passwordOK()){
			// 	setInitialBadPassword(true);
			// }
			return;
		}
		const user = {credential, password}
		dispatch(loginUser(user))
			.then(() => {
				setShowLogInModal(false)
			})
			.catch(async (res) => {
				setInvalidCredentials(true)
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
		setShowPassword(false);
		setCredential('demo@user.io');
		setPassword('dprian83');
		const user = {credential:'demo@user.io', password:'dprian83'}
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

	const loginErrorToolTip = () => {
		return (
			<div>
				{((formIncomplete || invalidCredentials) && password === "") && <div className={`error-tooltip `}><i className="fa-solid fa-circle-exclamation"></i> Password is required.</div>}
				{((formIncomplete || invalidCredentials) && (credential === "" || password === "" )) && <div className={`error-tooltip `}><i className={`fa-solid fa-circle-xmark`}></i>{` Invalid credentials`}</div>}
			</div>
		)
	}
	
	return (
		<div className="login-form">
			<header className="auth-form-header">
				<button autoFocus className='x-close' onClick={e => setShowLogInModal(false)}><i className="fa-solid fa-x"></i></button>
				<div className="auth-form-title">Log in</div>
			</header>
			<div className="auth-form-body">
				<form autoComplete='off' onSubmit={e => e.preventDefault()}>
					<div className={`${((formIncomplete || invalidCredentials) && (credential === "" || password === "")) ? `error-entry-div` : `name-entry-div`}`}>
						<div className='first-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									{/* <div className={`floating-placeholder ${credential === "" ? "" : "input-placeholder-not-empty" }`}>Email</div> */}
									<div className={`floating-placeholder ${(formIncomplete && (credential === "")) ? "input-placeholder-error" : credential === "" ? "" : "input-placeholder-not-empty" }`}>Email</div>
									<input
										// id="first-name-input"
										// className={`email ${(formIncomplete && email === "") && `session-error-input`}`}
										// className={`email`}
										className={`email ${(formIncomplete && (credential === "")) && `session-error-input`}`}
										type="text"
										value={credential}
										onChange={handleCredential}
										onFocus={e => setFocusInput("credential")}
										onBlur={e =>setFocusInput(null)}
										// placeholder={(focusInput === "credential") ? "Email" : ""}
										placeholder={(focusInput === "credential" || (formIncomplete && (credential === ""))) ? "Email" : ""}
										placeholderColor="green"
										required
									/>
								</div>
							</label>
						</div>
						
						<div className='last-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									{/* <div className={`floating-placeholder ${password === "" ? "" : "input-placeholder-not-empty" }`}>Password</div> */}
									<div className={`floating-placeholder ${ (formIncomplete && (password === "")) ? "input-placeholder-error" : password === "" ? "" : "input-placeholder-not-empty" }`}>Password</div>
									<input
										// id="last-name-input"
										// className={`password ${(formIncomplete && initialBadPassword) && `session-error-input`}`}
										// className={`password`}
										className={`password ${(formIncomplete && (password === "")) && `session-error-input`}`}
										type={showPassword ? `text` : `password`}
										value={password}
										onChange={handlePassword}
										onFocus={e => setFocusInput("password")}
										onBlur={e =>setFocusInput(null)}
										// placeholder={(focusInput === "password") ? "Last name" : ""}
										placeholder={(focusInput === "password" || (formIncomplete && (password === ""))) ? "Password" : ""}
										required
										maxLength={20}
									/>
									{/* <button type="button" className='show-pw-toggle' onClick={e => setShowPassword(old => !old)}>{showPassword ? 'Hide' : "Show"}</button> */}
									<button type="button" className={`show-pw-toggle ${initialBadPassword && `show-pw-toggle-pw-error`}`} onClick={e => setShowPassword(old => !old)}>{showPassword ? 'Hide' : "Show"}</button>
								</div>
							</label>
						</div>
					</div>
					{loginErrorToolTip()}
					{/* <div className='input-tooltip'>Make sure it matches the name on your government ID.</div> */}

					<div className='auth-session-btns'>
						<button className="session-btn" type="button" ref={loginRef} onMouseDown={mouseDownAuthBtn} onMouseUp={e => e.preventDefault()}>Log in</button>
						<button className="session-btn" type="button" ref={demoLoginRef} onMouseDown={mouseDownAuthBtn} >Demo log in</button>
					</div>
					<div className='signup-tooltip switch-auth-modal'>
						Don't have an account? <span className="signup-link" ref={signupBtnRef} onMouseDown={mouseDownAuthBtn} >Sign up</span>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm;