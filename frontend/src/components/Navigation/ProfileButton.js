import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
import { Redirect } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

import "./Navigation.css";

const ProfileButton = ({setShowSignUpModal, setShowLogInModal}) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session?.user)
	const [showMenu, setShowMenu] = useState(false);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		setShowMenu(false); //Do I need this? 
		return <Redirect to="/" />
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
		sessionLinks = (
			<>
				<li onClick={e => setShowSignUpModal(true)}>Sign up</li>
				<li onClick={e => setShowLogInModal(true)}>Log in</li>
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
				<li>Messages</li>
				<li>Trips</li>
				<li>Wishlists</li>
			</div>
				<li><MenuDivider /></li>
				<li>Sparebnb your home</li>
				<li>Account</li>
				<li><MenuDivider /></li>
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
				</ul>
			</div>
		)
	}

	return (
		<>
			<button className="session-menu-button" onClick={toggleMenu}>
				<i className="fa-solid fa-bars"></i>
				<div className="user-icon">
					{!sessionUser && <i className="fa-solid fa-user"></i>}
					{/* Profile photo is set up so that it cycles thru existing seed set of 12 photos, even if sessionUser.id exceeds 12 */}
					{sessionUser && <img className="fit-photo" src={require(`../../images/profilepics/${formatTwoDigitNumberString((sessionUser.id % 12) + 1)}.png`)} />}
				</div>
			</button>
			{showMenu&& <ProfileDropMenu />}
		</>
	)
}

export default ProfileButton;