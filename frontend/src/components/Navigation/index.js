import "./Navigation.css";
import { NavLink} from "react-router-dom"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ProfileButton from "./ProfileButton"
import LoginForm from "../AuthForms/LoginForm";
import SignupForm from "../AuthForms/SignupForm";
import { Modal } from "../../context/Modal";
import { useState } from "react";

const Navigation = ({filter, setFilter}) => {
	
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(false);
	
	// If on listings show page, narrow navbar.
	const location = useLocation();
	const upperNavbar = document.querySelector('.upper-navbar-header');
	const upperNavbarContainer = document.querySelector('.upper-navbar-container');
	if(location.pathname.startsWith('/listings')){
		upperNavbarContainer?.classList.add('narrow-navbar-container')
		upperNavbar?.classList.add('narrow-navbar')
		upperNavbar?.classList.remove('non-listings-header')
	} else {
		upperNavbarContainer?.classList.remove('narrow-navbar-container')
		upperNavbar?.classList.remove('narrow-navbar')
		upperNavbar?.classList.add('non-listings-header')
	}

	// Disables page scrolling if a modal is open!
	if(showLogInModal || showSignUpModal){
		// This was working fine before, but as of 7/20, it will cause site to expand to cover the missing scroll bar...need to check how to prevent this change in layout on page.
		// document.body.style.overflow = "hidden";
		document.querySelector('body').style.overflowY = "hidden";
	} else {
		// document.body.style.overflow = "scroll";
		document.querySelector('body').style.overflowY = "scroll";
	}

	const handleCloseModals = (e) => {
		setShowLogInModal(false)
		setShowSignUpModal(false)
	}

	return (
		<>
			<header className="upper-navbar-header">
				<div className="upper-navbar-container">
					<div className="upper-navbar-logo-div">
						<div onClick={e => setFilter(null)} className="upper-navbar-logo">
							{/* This onClick will force page to reload if click on Link when already on the to path */}
							{/* <Link onClick={() => window.location.pathname === "/" ? window.location.reload(): null} to="/"> */}
							<Link to="/">
								<img src={require("../../images/sparebnb_logo_2.png")} style={{width:"140px", height:"32px"}}/>
							</Link>
						</div>
					</div>
					<div className="upper-navbar-search-container">
						{/* {!location.pathname.startsWith('/users') && <div className="upper-navbar-search">
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
						</div>} */}
					</div>

					{/* UPPER RIGHT NAV!!! START */}
					<div className="upper-navbar-right-div">
						<nav className="upper-navbar-right"> 
							<div className="host-lang-buttons">
								{/* <NavLink className="host-home-link" to="/">Sparebnb your home</NavLink> */}
								<a target="_blank" className="host-home-link" href="https://www.linkedin.com/in/carvey-hor/">LinkedIn</a>
								<a target="_blank" href="https://github.com/carveyh/">
									<div className="lang-button-div">
										<button className="lang-button" >
										<i className="fa-brands fa-github"></i>
										</button>
									</div>
								</a>
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
			
			{/* {showSignUpModal && <Modal onClose={e => setShowSignUpModal(false)}>
				<SignupForm setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal}/>
			</Modal>}
			{showLogInModal && <Modal onClose={e => setShowLogInModal(false)}>
				<LoginForm setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal}/>
			</Modal>} */}
			{(showLogInModal || showSignUpModal) && <Modal onClose={handleCloseModals}>
				{showLogInModal && <LoginForm setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal}/>}
				{showSignUpModal && <SignupForm setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal}/>}
			</Modal>}
		</>
	)
}

export default Navigation;