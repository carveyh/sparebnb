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
import { destroyReservation, updateReservation } from "../../store/reservation";

export const TripCard = ({reservation, listing}) => {
	const dispatch = useDispatch();
	const [checkIn, setCheckIn] = useState(reservation.startDate)
	const [checkOut, setCheckOut] = useState(reservation.endDate)
	const [numGuests, setNumGuests] = useState(reservation.numGuests)

	const [dayAfter, setDayAfter] = useState();
	const [dayBefore, setDayBefore] = useState();

	const monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
	];

	const startDate = new Date(reservation?.startDate)
	const endDate = new Date(reservation?.endDate)
	let startDateMonth;
	if(startDate) startDateMonth = monthNames[startDate?.getMonth()]

	const minDate = () => {
		const month = String(new Date().getMonth() + 1)
		const date = String(new Date().getDate())
		return `${new Date().getFullYear()}-${month.length < 2 ? '0'.concat(month) : month}-${date.length < 2 ? '0' + date : date}`
	}

	const handleChangeCheckIn = e => {
		setCheckIn(e.target.value);
		setDayAfter(daysApartCalculator(e.target.value, 2));
	}

	const handleChangeCheckOut = e => {
		setCheckOut(e.target.value);
		setDayBefore(daysApartCalculator(e.target.value, -0));
	}

	const numGuestsSelector = () => {
		const options = [];
		for(let i = 1; i <= (listing ? listing.maxGuests : 0); i ++){
			options.push(<option value={i}>{i}</option>)
		}

		return (
			<div className="num-guests-container">
				<select className="num-guests-selector" value={numGuests} onChange={e => setNumGuests(e.target.value)}>
					{options}
				</select>
				<div className="num-guests-placeholder">GUESTS</div>
			</div>
		)
	}

	const daysApartCalculator = (oldDate, delta) => {
		console.log(oldDate)
		const tomorrow = new Date(oldDate)
		console.log(tomorrow)
		tomorrow.setDate(tomorrow.getDate() + delta)
		console.log(tomorrow)
		const month = String(tomorrow.getMonth() + 1)
		const date = String(tomorrow.getDate())
		console.log(`${tomorrow.getFullYear()}-${month.length < 2 ? '0'.concat(month) : month}-${date.length < 2 ? '0' + date : date}`)
		return `${tomorrow.getFullYear()}-${month.length < 2 ? '0'.concat(month) : month}-${date.length < 2 ? '0' + date : date}`
		
	}

	const handleUpdate = e => {
		e.preventDefault();
		const newReservation = {...reservation, startDate: checkIn, endDate: checkOut, numGuests: parseInt(numGuests)};
		// debugger

		// NEED TO TRY - CATCH
		try {
			dispatch(updateReservation(newReservation));
		} catch(err) {
			// can update err via state variable, or dispatch(receiveErrors), component can useSelector on errors.
			// dispatch(receieveUpdateReservationError)
			// so errorrs slice of state can point to key of errors: {updatedRservationError : {[backendmessage, numgeustserorr, endateerror]},  }
			// OR!!! could justhave a local useState for component.
		}
	}

	const handleDelete = e => {
		e.preventDefault();
		dispatch(destroyReservation(e.target.id))
	}

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
						
						{/* UDPATE FORM */}
						<div className="update-form-container">
							<form>
								<div className="update-form-inner-container">
									<div className="update-field ">
										Check in date:
										{/* <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/> */}
										<input className="checkin-input" 
											type="date"
											value={checkIn}
											min={minDate()}
											max={checkOut ? dayBefore : null}
											onChange={handleChangeCheckIn}
											required
										/>
									</div>
									<div className="update-field ">
										Check out date:
										{/* <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}/> */}
										<input className="checkout-input" 
											type="date"
											value={checkOut}
											min={checkIn ? dayAfter : null}
											onChange={handleChangeCheckOut}
											required
										/>
									</div>
									<div className="update-field ">
										Number of guests:
										{numGuestsSelector()}
									</div>
									<div className="update-field ">
										<input type="button" onClick={handleUpdate} value="Update reservation"/>
										<input type="button" id={reservation?.id} onClick={handleDelete} value="Delete reservation"/>
									</div>

									
									
								</div>	
							</form>
						</div>
						{/* UDPATE FORM */}

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