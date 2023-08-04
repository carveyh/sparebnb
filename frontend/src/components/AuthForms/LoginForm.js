import './AuthForm.css';

import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session";
import { useEffect } from 'react';
import { useRef } from 'react';

const LoginForm = ({setShowSignUpModal, setShowLogInModal}) => {
	useEffect(() => {
		document.querySelector(".x-close").focus({focusVisible:true, preventScroll:false})
	}, [])
	const dispatch = useDispatch();
	
	const [focusInput, setFocusInput] = useState(null);
	const [credential, setCredential] = useState('');	
	const [password, setPassword] = useState('');	
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState([]);

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
		setShowPassword(false);
		setCredential('demo@user.io');
		setPassword('dprian83');
		const user = {email:'demo@user.io', password:'dprian83'}
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
				<div className="auth-form-title">Log in</div>
			</header>
			<div className="auth-form-body">
				<form onSubmit={e => e.preventDefault()}>
					<div className='name-entry-div'>
						<div className='first-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${credential === "" ? "" : "input-placeholder-not-empty" }`}>Email</div>
									<input
										id="first-name-input"
										type="text"
										value={credential}
										onChange={handleCredential}
										onFocus={e => setFocusInput("credential")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "credential") ? "First name" : ""}
										placeholderColor="green"
										required
									/>
								</div>
							</label>
						</div>
						<div className='last-name-box'>
							<label className='name-entry-label'>
								<div className='floating-placeholder-container'>
									<div className={`floating-placeholder ${password === "" ? "" : "input-placeholder-not-empty" }`}>Password</div>
									<button type="button" className='show-pw-toggle' onClick={e => setShowPassword(old => !old)}>{showPassword ? 'Hide' : "Show"}</button>
									<input
										id="last-name-input"
										type={showPassword ? `text` : `password`}
										value={password}
										onChange={handlePassword}
										onFocus={e => setFocusInput("password")}
										onBlur={e =>setFocusInput(null)}
										placeholder={(focusInput === "password") ? "Last name" : ""}
										required
									/>
								</div>
							</label>
						</div>
					</div>
					{/* <div className='input-tooltip'>Make sure it matches the name on your government ID.</div> */}

					<div className='auth-session-btns'>
						<input className="session-btn" type="text" ref={loginRef} value="Log in" onMouseDown={mouseDownAuthBtn} onMouseUp={e => e.preventDefault()}/>
						<input className="session-btn" type="text" ref={demoLoginRef} value="Demo Log in" onMouseDown={mouseDownAuthBtn} />
					</div>
					<div className='signup-tooltip'>
						Don't have an account? <span className="signup-link" ref={signupBtnRef} onMouseDown={mouseDownAuthBtn} >Sign up</span>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm;