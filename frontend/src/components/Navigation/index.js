import "./Navigation.css";
import { NavLink} from "react-router-dom"
import { Link } from "react-router-dom";

import ProfileButton from "./ProfileButton"
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from "../../context/Modal";
import { useState } from "react";

const Navigation = () => {
	
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(false);

	// Disables page scrolling if a modal is open!
	if(showLogInModal || showSignUpModal){
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "scroll";
	}

return (
		<>
			<header className="upper-navbar-header">
				<div className="upper-navbar-container">
					<div className="upper-navbar-logo-div">
						<div className="upper-navbar-logo">
							{/* This onClick will force page to reload if click on Link when already on the to path */}
							<Link onClick={() => window.location.pathname === "/" ? window.location.reload(): null} to="/">
								<img src={require("../../images/sparebnb_logo_2.png")} style={{width:"140px", height:"32px"}}/>
							</Link>
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

					{/* UPPER RIGHT NAV!!! START */}
					<div className="upper-navbar-right-div">
						<nav className="upper-navbar-right"> 
							<div className="host-lang-buttons">
								{/* <NavLink className="host-home-link" to="/">Sparebnb your home</NavLink> */}
								<a className="host-home-link" href="https://www.linkedin.com/in/carvey-hor/">LinkedIn</a>
								<div className="lang-button-div">
									<button className="lang-button" >
										<i className="fa-brands fa-github"></i>
									</button>
								</div>
							</div>
							<div className="session-menu-div">
								<ProfileButton 
									setShowSignUpModal={setShowSignUpModal}
									setShowLogInModal={setShowLogInModal}
								/>
							</div>
						</nav>
					</div>
					{/* UPPER RIGHT NAV!!! END */}

				</div>
			</header>
			
			{showSignUpModal && <Modal onClose={e => setShowSignUpModal(false)}>
				<SignupForm setShowSignUpModal={setShowSignUpModal}/>
			</Modal>}
			{showLogInModal && <Modal onClose={e => setShowLogInModal(false)}>
				<LoginForm setShowLogInModal={setShowLogInModal}/>
			</Modal>}
		</>
	)
}

export default Navigation;