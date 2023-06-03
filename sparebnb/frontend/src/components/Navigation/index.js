import "./Navigation.css";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import ProfileButton from "./ProfileButton"
import LoginFormModal from "../LoginFormModal";

const Navigation = () => {
	const sessionUser = useSelector(state => state.session?.user)

	let sessionLinks;

	if(!sessionUser){
		sessionLinks = (
			<>
			<li><LoginFormModal /></li>
			<li><NavLink exact activeStyle={{ backgroundColor:"teal" }} to="/signup">Signup</NavLink></li>
			</>
		)
	}

return (
		<>
			<header className="upper-navbar-header">
				<div className="upper-navbar-container">
					<div className="upper-navbar-logo">
						<img src={require("./placeholder_logo.png")} />
						{/* <img src="./placeholder_logo.png" /> */}
						{/* <img src=".../images/placeholder_logo.png" /> */}
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