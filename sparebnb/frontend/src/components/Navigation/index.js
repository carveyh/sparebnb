import "./Navigation.css";
import { useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom"

import ProfileButton from "./ProfileButton"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from "../../context/Modal";
import { useState } from "react";

const Navigation = () => {
	const sessionUser = useSelector(state => state.session?.user)
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(false);

	let sessionLinks;

	if(!sessionUser){
		sessionLinks = (
			<>
			<li><LoginFormModal /></li>
			<li><SignupFormModal /></li>
			{/* <li><NavLink exact activeStyle={{ backgroundColor:"teal" }} to="/signup">Signup</NavLink></li> */}
			</>
		)
	}

return (
		<>
			<header className="upper-navbar-header">
				<div className="upper-navbar-container">
					<div className="upper-navbar-logo-div">
						<div className="upper-navbar-logo">
							<img src={require("../../images/sparebnb_logo_2.png")} style={{width:"140px", height:"32px"}}/>
						</div>
					</div>
					<div className="upper-navbar-search-container">
						<div className="upper-navbar-search">
							<span className="search-location-unopened"></span>
							<button className="search-location-unopened">
								Anywhere
							</button>
							<span className="search-date-unopened"></span>
							<button className="search-date-unopened">
								Any week
							</button>
							<span className="search-people-unopened"></span>
							<button className="search-people-unopened">
								<div className="search-people-unopened-text" >
									Add guests
								</div>
								<div className="search-people-unopened-magnifying">
									<i className="fa-solid fa-magnifying-glass"></i>
								</div>
							</button>
						</div>
					</div>

					{/* OPERATION: UPPER RIGHT NAV!!! START */}

					<div className="upper-navbar-right-div">
						<nav className="upper-navbar-right"> 
							<div className="host-lang-buttons">
								<NavLink className="host-home-link" to="/">Sparebnb your home</NavLink>
								<div className="lang-button-div">
									<button className="lang-button" >
										<i className="fa-brands fa-github"></i>
									</button>
								</div>
							</div>
							<div className="session-menu-div">
								{/* <button className="session-menu-button">
									<ProfileButton />
									<i className="fa-solid fa-bars"></i>
									<div className="user-icon">
										<i className="fa-solid fa-user"></i>
									</div>
								</button> */}
								<ProfileButton 
									setShowSignUpModal={setShowSignUpModal}
									setShowLogInModal={setShowLogInModal}
								/>
							</div>
						</nav>
					</div>



					{/* OPERATION: UPPER RIGHT NAV!!! END */}

				</div>
			</header>
			
			{showSignUpModal && <Modal onClose={e => setShowSignUpModal(false)}>
				<SignupForm />
			</Modal>}
			{showLogInModal && <Modal onClose={e => setShowLogInModal(false)}>
				<LoginForm />
			</Modal>}
		</>
	)
}

export default Navigation;