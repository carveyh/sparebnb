import "./ProfilePage.css";

const ProfilePage = (props) => {
	return (
		<>
			<div className="profile-page-outer-container">
				<div className="profile-page-inner-container">
					{/* HEADER */}
					<div className="heading-container">
						<div className="heading-container-text heading-1">
							Trips
						</div>
					</div>
					{/* HEADER */}

					{/* TRIP CARDS - UPCOMING */}
					<div className="trip-cards-outer-container-upcoming">
						<div className="trip-cards-header">
							Upcoming reservations
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
						</div>
					</div>
					{/* TRIP CARDS - UPCOMING */}

						{/* HORIZONTAL RULEEEEEEEEEEEEEEEEEEEEE */}
					
					{/* TRIP CARDS - PAST */}
					<div className="trip-cards-outer-container-upcoming">
						<div className="trip-cards-header">
							Past reservations
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
						</div>
					</div>
					{/* TRIP CARDS - PAST */}
					
						{/* HORIZONTAL RULEEEEEEEEEEEEEEEEEEEEE */}
					
					{/* FOOTER */}
					<div className="footer-container">
						<div className="footer-text">
							Can't find your reservation here? <div className="footer-links">Github</div> <div className="footer-links">LinkedIn</div> 
						</div>
					</div>
					{/* FOOTER */}




				</div>
			</div>
		</>
	)
}

export default ProfilePage;