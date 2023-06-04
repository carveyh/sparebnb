import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

// import LoginForm from "../LoginFormModal/LoginForm";
// import SignupForm from "../SignupFormModal/SignupForm";
// import { Modal } from "../../context/Modal";

import "./Navigation.css";

const ProfileButton = ({setShowSignUpModal, setShowLogInModal}) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session?.user)
	const [showMenu, setShowMenu] = useState(false);
	// const [showSignUpModal, setShowSignUpModal] = useState(false);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		setShowMenu(false); //Do I need this?
		return <Redirect to="/" />
	}

	const openMenu = (e) => {
		e.preventDefault();
		if(showMenu) return
		setShowMenu(true)
	}

	const toggleMenu = (e) => {
		e.preventDefault();
		setShowMenu(oldShowMenu => !oldShowMenu);
	}

	useEffect(() => {
		if(showMenu){
			const closeMenu = () => {
				setShowMenu(false)
			}	
			document.addEventListener("click", closeMenu)
			return () => document.removeEventListener("click", closeMenu)
		}
	}, [showMenu])


	const MenuDivider = () => {
		return (
			<div className="menu-divider"></div>
		)
	}

	let sessionLinks;

	if(!sessionUser) {
		// debugger
		sessionLinks = (
			<>






				{/* HERE WE GO - START*/}
				{/* <li><SignupFormModal /></li> */}
				{/* <li onClick={e => setShowSignUpModal(true)}>Sign up</li>
				{showSignUpModal && 
					<Modal onClose={e => setShowSignUpModal(false)}>
						<SignupForm />
					</Modal>
				} */}
				<li onClick={e => setShowSignUpModal(true)}>Sign up</li>







				{/* HERE WE GO - END */}










				<li onClick={e => setShowLogInModal(true)}>Log in</li>
				{/* <li><LoginFormModal /></li> */}
				<li><MenuDivider /></li>
				<li>Sparebnb your home</li>
				<li>Help</li>
			</>
		)
	}
	if(sessionUser) {
		sessionLinks = (
			<>
			<div className="profile-drop-menu-bold-item">
				<li>2023 Summer Release NEW</li>
				<li><MenuDivider /></li>
				{/* <li className="menu-divider"></li> */}
				<li>Messages</li>
				<li>Trips</li>
				<li>Wishlists</li>
			</div>
				<li><MenuDivider /></li>
				{/* <li className="menu-divider"></li> */}
				<li>Sparebnb your home</li>
				<li>Account</li>
				<li><MenuDivider /></li>
				{/* <li className="menu-divider"></li> */}
				<li>Help</li>
				<li onClick={handleLogout}>Logout</li>
			</>
		)
	}


	const ProfileDropMenu = () => {
		return (
			<div className="profile-drop-menu">
				<ul>
					{sessionLinks}
					{/* <li>Logged in as: {sessionUser?.username}</li>
					<MenuDivider />
					<li>Email: {sessionUser?.email}</li>
					{sessionUser && <li><Link onClick={handleLogout}>Logout</Link></li>} */}
				</ul>
			</div>
		)
	}

	return (
		// <div
		// 	className="profile-button-visible-check"
		// 	onClick={openMenu}
		// >
		// 	{/* <div 
		// 		style={{ color: "red", fontSize: "30px" }} 
		// 		onClick={openMenu}
		// 	>
		// 		{sessionUser && 
		// 		<>
		// 			<i className="fa-solid fa-poo"></i>
		// 			(ProfilePlaceholder)
		// 		</>}
		// 		{!sessionUser && 
		// 		<>
		// 			<i className="fa-solid fa-bars"></i>
		// 			(NotLoggedInPlaceholder)
		// 		</>}
				
		// 	</div> */}

		// 	{(showMenu && sessionUser) && <ProfileDropMenu />}

		// </div>
<>
<button className="session-menu-button" onClick={toggleMenu}>
{/* <button className="session-menu-button" onClick={openMenu}> */}
	<i className="fa-solid fa-bars"></i>
	<div className="user-icon">
		<i className="fa-solid fa-user"></i>
	</div>
</button>
	{showMenu&& <ProfileDropMenu />}
</>
	)
}

export default ProfileButton;