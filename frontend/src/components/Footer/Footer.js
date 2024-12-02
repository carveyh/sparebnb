import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
	const location = useLocation();
	const narrowFooter = location.pathname.startsWith('/listings') ? true : false;
	return (
		<div className={`footer-container ${narrowFooter ? 'narrow-footer-container' : ''}`}>
			<div className="footer-general-links">
				<span className="">© 2023 Sparebnb, Inc.</span>
				<span className="footer-dot">·</span>
				<span className="footer-link"><a target="_blank" href="https://carvey.dev/">Carvey Hor</a></span>
				<span className="footer-dot">·</span>
				<span className="footer-link"><a target="_blank" href="https://www.linkedin.com/in/carvey-hor/">LinkedIn</a></span>
				<span className="footer-dot">·</span>
				<span className="footer-link"><a target="_blank" href="https://github.com/carveyh/">Github</a></span>
			</div>
			<div className="footer-icon-links">
				<div><a target="_blank" href="https://www.linkedin.com/in/carvey-hor/"><i className="fa-brands fa-linkedin"></i></a></div>
				<div><a target="_blank" href="https://github.com/carveyh/"><i className="fa-brands fa-square-github"></i></a></div>
			</div>
		</div>
	)
}

export default Footer;