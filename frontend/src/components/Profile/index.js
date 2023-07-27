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

	const unChanged = () => checkIn === reservation.startDate && checkOut === reservation.endDate && numGuests.toString() === reservation.numGuests.toString()

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
			<div className="num-guests-container trips-update-field">
				<select className="num-guests-selector " value={numGuests} onChange={e => setNumGuests(e.target.value)}>
					{options}
				</select>
			</div>
		)
	}

	const daysApartCalculator = (oldDate, delta) => {
		const tomorrow = new Date(oldDate)
		tomorrow.setDate(tomorrow.getDate() + delta)
		const month = String(tomorrow.getMonth() + 1)
		const date = String(tomorrow.getDate())
		return `${tomorrow.getFullYear()}-${month.length < 2 ? '0'.concat(month) : month}-${date.length < 2 ? '0' + date : date}`
		
	}

	const handleUpdate = e => {
		e.preventDefault();
		if(!unChanged()){
			const newReservation = {...reservation, startDate: checkIn, endDate: checkOut, numGuests: parseInt(numGuests)};
			try {
				dispatch(updateReservation(newReservation))
					.then(() => unChanged())
			} catch(err) {
				// can update err via state variable, or dispatch(receiveErrors), component can useSelector on errors.
				// dispatch(receieveUpdateReservationError)
				// so errorrs slice of state can point to key of errors: {updatedRservationError : {[backendmessage, numgeustserorr, endateerror]},  }
				// OR!!! could justhave a local useState for component.
			}
		}
	}

	const handleDelete = e => {
		e.preventDefault();
		dispatch(destroyReservation(e.target.id))
	}

	const handleReset = e => {
		setCheckIn(reservation.startDate)
		setCheckOut(reservation.endDate)
		setNumGuests(reservation.numGuests)
	}

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
							Entire cabin hosted by {listing?.hostFirstName}
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
									<div className="update-field trips-update-field">
										Check in date:
										{/* <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/> */}
										<input className="checkin-input trips-date-input" 
											type="date"
											value={checkIn}
											min={minDate()}
											max={checkOut ? dayBefore : null}
											onChange={handleChangeCheckIn}
											required
										/>
									</div>
									<div className="update-field trips-update-field">
										Check out date:
										{/* <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}/> */}
										<input className="checkout-input trips-date-input" 
											type="date"
											value={checkOut}
											min={checkIn ? dayAfter : null}
											onChange={handleChangeCheckOut}
											required
										/>
									</div>
									<div className="update-field trips-update-field">
										Number of guests:
											{numGuestsSelector()}
									</div>
									<div className="update-field trips-update-field trip-crud-buttons">
										<input className={unChanged() ? `trip-crud-btn-disabled` : `trip-crud-btn-enabled`} type="button" onClick={handleUpdate} value="Update"/>
										<input type="button" id={reservation?.id} onClick={handleDelete} value="Delete"/>
									</div>
									<div className="update-field trips-update-field trip-card-reset-box">
										{/* <input className={unChanged() ? `trip-crud-btn-disabled` : `trip-crud-btn-enabled`} type="button" onClick={handleUpdate} value="Update"/> */}
										<div id={reservation?.id} onClick={handleReset}><i class="fa-solid fa-rotate-right"></i></div>
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
	 
	useEffect(() => {
		window.scrollTo(0, 0);
		
		dispatch(clearAllReservations())
		dispatch(fetchReservations({id: userId, type: "user"}))

		dispatch(fetchListings())
		dispatch(fetchUser)
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

			if(new Date(reservationsArray[i].endDate) > new Date()) {
				if(new Date(reservationsArray[i].startDate) < new Date()) {
					currentTripTiles.push(
						<TripCard key={reservationsArray[i].id} reservation={reservationsArray[i]} listing={filteredListing}/>
					)
				} else {
					upcomingTripTiles.push(
						<TripCard key={reservationsArray[i].id} reservation={reservationsArray[i]} listing={filteredListing}/>
					)
				}
				
			} else {
				pastTripTiles.push(
					<TripCard key={reservationsArray[i].id} reservation={reservationsArray[i]} listing={filteredListing}/>
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
							Active trips
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
							Past trips
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