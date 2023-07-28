import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllReservations, fetchReservations } from "../../store/reservation";
import { fetchListings, fetchUsersListings } from "../../store/listings";
import { fetchUser } from "../../store/user";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { destroyReservation, updateReservation } from "../../store/reservation";

import { TripCard } from "./TripCard";
import { clearAllResReviews, fetchResReviewsForGuest } from "../../store/reservation_reviews";

const ProfilePage = (props) => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	const sessionUser = useSelector(state => state.session?.user)
	const reservations = useSelector(state => state.entities?.reservations ? state.entities.reservations : null)
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : null)
	const reviews = useSelector(state => state.entities?.resReviews ? state.entities.resReviews : null)

	// const [showReviewModal, setShowReviewModal] = useState(false);

	

	useEffect(() => {
		// window.scrollTo(0, 0);
		
		dispatch(clearAllReservations())
		dispatch(fetchReservations({id: userId, type: "user"}))

		dispatch(fetchListings())
		dispatch(fetchUser)

		dispatch(clearAllResReviews())
		dispatch(fetchResReviewsForGuest(userId))
	}, [])

	// Format reservations - sort and separate into upcoming, past trips
	const currentTripTiles = [];
	const upcomingTripTiles = [];
	const pastTripTiles = [];
	if(reservations){
		// Sort by start date; if same, sort by end date
		const reservationsArray = Object.values(reservations).sort((a, b) => {
			const startDateDiff = new Date(b.startDate) - new Date(a.startDate)
			const endDateDiff = new Date(b.endDate) - new Date(a.endDate)
			if(startDateDiff !== 0) {
				return startDateDiff;
			} else {
				return endDateDiff;
			}
		})

		// Filter into upcoming and past trips
		for(let i = 0; i < reservationsArray.length; i++){
			const filteredListing = Object.values(listings).filter(listing => listing.id === reservationsArray[i].listingId)[0]
			const review = Object.values(reviews).filter(review => review.reservationId === reservationsArray[i].id)[0]
			if(new Date(reservationsArray[i].endDate) > new Date()) {
				if(new Date(reservationsArray[i].startDate) < new Date()) {
					currentTripTiles.push(
						<TripCard key={reservationsArray[i].id} reservation={reservationsArray[i]} listing={filteredListing} review={review} tripType={"active"} />
					)
				} else {
					upcomingTripTiles.push(
						<TripCard key={reservationsArray[i].id} reservation={reservationsArray[i]} listing={filteredListing} review={review} tripType={"upcoming"} />
					)
				}
				
			} else {
				pastTripTiles.push(
					<TripCard key={reservationsArray[i].id} reservation={reservationsArray[i]} listing={filteredListing} review={review} tripType={"past"} />
				)
			}
		}
	}

	if(!sessionUser) return <Redirect to="/" />;	

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

					{/* TRIP CARDS - CURRENT */}
					<div className="trip-cards-outer-container-active">
						<div className="trip-cards-header heading-2">
							Happening now
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
							{currentTripTiles.length ? currentTripTiles : <div className="trips-not-found">This list is empty.</div> }
						</div>
					</div>
					{/* TRIP CARDS - UPCOMING */}

					{/* TRIP CARDS - UPCOMING */}
					<div className="trip-cards-outer-container-upcoming">
						<div className="trip-cards-header heading-2">
							Upcoming trips
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
							{upcomingTripTiles.length ? upcomingTripTiles : <div className="trips-not-found">This list is empty.</div> }
						</div>
					</div>
					{/* TRIP CARDS - UPCOMING */}

						{/* HORIZONTAL RULEEEEEEEEEEEEEEEEEEEEE */}
					
					{/* TRIP CARDS - PAST */}
					<div className="trip-cards-outer-container-past">
						<div className="trip-cards-header heading-2">
							Where you've been
						</div>
						<div className="trip-cards-main-container">
							{/* ALL CARDS FOR PAST RESEREVATIONS */}
							{pastTripTiles.length ? pastTripTiles : <div className="trips-not-found">This list is empty.</div> }
						</div>
					</div>
					{/* TRIP CARDS - PAST */}
					
						{/* HORIZONTAL RULEEEEEEEEEEEEEEEEEEEEE */}
					
					{/* FOOTER */}
					<div className="footer-container">
						<div className="footer-text">
							<div>Can't find your reservation here?</div> 
							<div className="footer-links"><a target="_blank" href="https://github.com/carveyh">Github</a></div> 
							<div className="footer-links"><a target="_blank" href="https://www.linkedin.com/in/carvey-hor/">LinkedIn</a></div> 
						</div>
					</div>
					{/* FOOTER */}

				</div>
			</div>
		</>
	)
}

export default ProfilePage;