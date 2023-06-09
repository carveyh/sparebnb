import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReservations } from "../../store/reservation";
import { fetchListings, fetchUsersListings } from "../../store/listings";
import { fetchUser } from "../../store/user";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

export const TripCard = ({reservation, listing}) => {
	// debugger

	const monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
	];

	const startDate = new Date(reservation?.startDate)
	const endDate = new Date(reservation?.endDate)
	let startDateMonth;
	if(startDate) startDateMonth = monthNames[startDate?.getMonth()]

	// if(!reservation || !listing) return null;
	return (
		<>
			<div className="trip-card">

				{/* LEFT SIDE */}
				<div className="trip-text-main">
					<div className="trip-text-title-main">
						<div className="trip-text-title-actual heading-1">
							{listing?.title}
						</div>
						<div className="trip-text-title-host stats-text-small">
							Entire cabin hosted by ...
						</div>
					</div>
					<div className="trip-text-details-main">
						<div className="trip-text-details-date-info">
							<div>{startDateMonth}</div>
							<div>{`${startDate?.getDate()} - ${endDate?.getDate()}`}</div>
							<div>{`${startDate?.getFullYear()}`}</div>
						</div>
						<div className="trip-text-details-address-info">
							<div>{listing?.address}</div>
							<div>{`${listing?.city}, ${listing?.state}`}</div>
							<div>United States</div>
						</div>
					</div>
				</div>
				{/* LEFT SIDE */}

				{/* RIGHT SIDE */}
				<div className="trip-photo-main">
					{/* <img className="" src={require(`../../images/listings/${listingId}/${imageNum}.png`)} /> */}
					{listing && <img className="trip-photo-img" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} />}
				</div>
				{/* RIGHT SIDE */}

			</div>
		</>
	)
}

export const TripMenu = ({reservation, listing}) => {

	// if(!reservation) return null;
	return (
		<>
			<div className="trip-menu">
				MENU
			</div>
		</>
	)
}

const ProfilePage = (props) => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	const sessionUser = useSelector(state => state.session?.user)
	const reservations = useSelector(state => state.entities?.reservations ? state.entities.reservations : null)
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : null)
	// debugger 
	useEffect(() => {
		// dispatch(fetchReservations(userId))
		dispatch(fetchReservations({id: userId, type: "user"}))
		
		// // Wish to achieve this. But out of time. REVISIT
		// dispatch(fetchUsersListings(userId))

		dispatch(fetchListings())
		dispatch(fetchUser)
	}, [])

	const upcomingTripTiles = [];
	if(reservations){
		const reservationsArray = Object.values(reservations)
		for(let i = 0; i < reservationsArray.length; i++){
			// reservationsArray[i].listingId
			const filteredListing = Object.values(listings).filter(listing => listing.id === reservationsArray[i].listingId)[0]
			// debugger
			upcomingTripTiles.push(
				<TripCard reservation={reservationsArray[i]} listing={filteredListing}/>
			)
			// upcomingTripTiles.push(
			// 	<TripMenu reservation={reservationsArray[i]} listing={filteredListing}/>
			// )
			// debugger
		}
	}





	// if(!sessionUser || sessionUser?.id !== userId) return null;
	if(!reservations || !listings) return null;	

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
							{upcomingTripTiles}
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
							<div className="trips-not-found">This list is empty.</div>
						</div>
					</div>
					{/* TRIP CARDS - PAST */}
					
						{/* HORIZONTAL RULEEEEEEEEEEEEEEEEEEEEE */}
					
					{/* FOOTER */}
					<div className="footer-container">
						<div className="footer-text">
							<div>Can't find your reservation here?</div> 
							<div className="footer-links"><a href="https://github.com/carveyh">Github</a></div> 
							<div className="footer-links"><a href="https://www.linkedin.com/in/carvey-hor/">LinkedIn</a></div> 
						</div>
					</div>
					{/* FOOTER */}




				</div>
			</div>
		</>
	)
}

export default ProfilePage;