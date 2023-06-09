import "./ProfilePage.css";

export const TripCard = (props) => {
	return (
		<>
			<div className="trip-card">
				CARD
			</div>
		</>
	)
}

export const TripMenu = (props) => {
	return (
		<>
			<div className="trip-menu">
				MENU
			</div>
		</>
	)
}

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
						<div className="trip-cards-header heading-2">
							Upcoming reservations
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
							<TripCard />
							<TripMenu />
							<TripCard />
							<TripMenu />
						</div>
					</div>
					{/* TRIP CARDS - UPCOMING */}

						{/* HORIZONTAL RULEEEEEEEEEEEEEEEEEEEEE */}
					
					{/* TRIP CARDS - PAST */}
					<div className="trip-cards-outer-container-past">
						<div className="trip-cards-header heading-2">
							Past reservations
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
							<TripCard />
							<TripMenu />
							<TripCard />
							<TripMenu />
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