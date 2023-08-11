import "./Footer.css";

const Footer = () => {
	return (
		<div className="footer-container">
			<div className="footer-general-links">
				<span className="">© 2023 Sparebnb, Inc.</span>
				<span className="footer-dot">·</span>
				<span className="">Carvey Hor</span>
				<span className="footer-dot">·</span>
				<span className="footer-link"><a target="_blank" href="https://www.linkedin.com/in/carvey-hor/">LinkedIn</a></span>
				<span className="footer-dot">·</span>
				<span className="footer-link"><a target="_blank" href="https://github.com/carveyh/">Github</a></span>
			</div>
			<div className="footer-icon-links">
				<div><a target="_blank" href="https://www.linkedin.com/in/carvey-hor/"><i class="fa-brands fa-linkedin"></i></a></div>
				<div><a target="_blank" href="https://github.com/carveyh/"><i class="fa-brands fa-square-github"></i></a></div>
			</div>
		</div>
	)
}

export default Footer;