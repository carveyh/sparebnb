import "./Navigation.css";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import ProfileButton from "./ProfileButton"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const Navigation = () => {
	const sessionUser = useSelector(state => state.session?.user)

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
					<div className="upper-navbar-logo">
						{/* <img src={require("../../images/airbnb_logo.png")} style={{width:"102px", height:"33px"}}/> */}
						<img src={require("../../images/sparebnb_logo_2.png")} style={{width:"140px", height:"32px"}}/>
					</div>
					<div className="upper-navbar-search"> Anywhere | Any week | Add guests </div>
					<nav className="upper-navbar-right"> Airbnb your home | O | Add guests </nav>
				</div>
			</header>
			<div className="nav-bar-container">
				<ProfileButton />
				<ul className="nav-bar-links">
					<li><NavLink exact activeStyle={{ backgroundColor:"blue" }} to="/testing">Testing</NavLink></li>
					<li><NavLink exact activeStyle={{ backgroundColor:"blue" }} to="/">Home</NavLink></li>
					{sessionLinks}
				</ul>
			</div>
		</>
	)
}

export default Navigation;