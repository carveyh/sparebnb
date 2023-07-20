import "./ListingsShowPage.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListing, fetchListings } from "../../store/listings";
import { fetchUser } from "../../store/user";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { useState } from "react";
import { createReservation } from "../../store/reservation";

import {AnimatePresence, motion} from "framer-motion";

export const ListingsShowPhoto = ({listingId, imageNum}) => {
	listingId = formatTwoDigitNumberString(listingId);
	imageNum = formatTwoDigitNumberString(imageNum);
	const photoDirPath = `../../images/listings/${listingId}/${imageNum}.png`;
	
	return(
		<>
			{/* Why can't I replace string with photoDirPath...? */}
			<img className="listings-show-photo" src={require(`../../images/listings/${listingId}/${imageNum}.png`)} />
		</>
	)
}

const ListingsShowPage = (props) => {
	const dispatch = useDispatch();
	const { listingId } = useParams()
	const sessionUser = useSelector(state => state.session?.user)
	const listing = useSelector(state => state.entities?.listings ? state.entities.listings[`${listingId}`] : {})
	const host = useSelector(state => state.entities?.users ? state.entities.users[`${listing?.hostId}`] : {})
	const hostIdFormatted = formatTwoDigitNumberString(host?.id);	

	useEffect(() => {
		dispatch(fetchListing(listingId));
		dispatch(fetchUser(listing?.hostId));
	}, [])

	const [checkIn, setCheckIn] = useState();
	const [checkOut, setCheckOut] = useState();
	const [numGuests, setNumGuests] = useState(1);
	const [dayAfter, setDayAfter] = useState();
	const [dayBefore, setDayBefore] = useState();
	const [errors, setErrors] = useState([]);
	const [bookingConfirmed, setBookingConfirmed] = useState(false);
	const [buttonClickable, setButtonClickable] = useState(true);

	const handleChangeCheckIn = e => {
		setCheckIn(e.target.value);
		setDayAfter(daysApartCalculator(e.target.value, 2));
	}

	const handleChangeCheckOut = e => {
		setCheckOut(e.target.value);
		setDayBefore(daysApartCalculator(e.target.value, -0));
	}



	const daysApartCalculator = (oldDate, delta) => {
		const tomorrow = new Date(oldDate)
		tomorrow.setDate(tomorrow.getDate() + delta)
		const month = String(tomorrow.getMonth() + 1)
		const date = String(tomorrow.getDate())
		return `${tomorrow.getFullYear()}-${month.length < 2 ? '0'.concat(month) : month}-${date.length < 2 ? '0' + date : date}`
		
	}
	
	const minDate = () => {
		const month = String(new Date().getMonth() + 1)
		const date = String(new Date().getDate())
		return `${new Date().getFullYear()}-${month.length < 2 ? '0'.concat(month) : month}-${date.length < 2 ? '0' + date : date}`
	}

	const numNights = () => {
		if(!checkIn || !checkOut) return null;
		const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	const baseTotalCost = () => {
		return numNights() ? numNights() * listing.baseNightlyRate : listing.baseNightlyRate;
	}

	const cleaningFee = 350;
	const baseServiceFee = 350;

	const totalServiceFee = () => {
		return numNights() ? numNights() * baseServiceFee : baseServiceFee;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!sessionUser || !buttonClickable) {
			return
		} else {
			const reservation = { checkIn, checkOut, numGuests, listingId,
				reserverId: sessionUser.id,
				baseNightlyRate: listing.baseNightlyRate
			};
			dispatch(createReservation(reservation))
				.then(() => {
					setBookingConfirmed(true);
					setButtonClickable(false);
					setTimeout(() => {
						setBookingConfirmed(false);
						setButtonClickable(true);
					}, 2000);
				})
				.catch(async (res) => {
				let data;
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text()
				}
				if(data?.errors) setErrors(data.errors)
				else if(data) setErrors([data])
				else setErrors([res.statusText]);
			})
		}
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

	if(!listing || !host) return null;

	return (
		// <AnimatePresence>
		// <motion.div className="show-page-outer-container" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
		<div className="show-page-outer-container" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
			<div className="show-page-dynamic-inner-container">

				{/* HEADER - START */}
				{/* HEADER - START */}
				<div className="show-header-full-header">
					<div className="show-header-inner-header">
						<div className="show-title heading-1">
						{`${listing?.title}`}
						</div>
						<div className="show-header-details">
							<div className="show-header-stats">
								<span className="rating-review-stats stats-text-small">
									<span className="star-icon"><i class="fa-solid fa-star"></i></span>
									<span className="header-rating">4.93 ·</span>
									<span className="header-review-count">15 reviews</span>
								</span>
							</div>
							<div className="show-header-buttons stats-text-small">
								<i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;Share 
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<i class="fa-regular fa-heart"></i>&nbsp;&nbsp;Save
							</div>
						</div>
					</div>
				</div>
				{/* HEADER - END */}
				{/* HEADER - END */}

				{/* PHOTO WALL - START */}
				{/* PHOTO WALL - START */}
				<div className="photo-wall-crown">
					<div className="photo-wall-container">
						<div className="photo-wall-halver">
							<div className="photo-wall-individual-photo-div photo-wall-big">
								<ListingsShowPhoto listingId={listingId} imageNum={1}/>
							</div>
							<div className="photo-wall-grid">
								<div className="photo-wall-individual-photo-div photo-wall-one">
									<ListingsShowPhoto listingId={listingId} imageNum={2}/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-two">
									<ListingsShowPhoto listingId={listingId} imageNum={3}/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-three">
									<ListingsShowPhoto listingId={listingId} imageNum={4}/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-four">
									<ListingsShowPhoto listingId={listingId} imageNum={5}/>
								</div>
							</div>
						</div>
					</div>	
				</div>
				{/* PHOTO WALL - END */}
				{/* PHOTO WALL - END */}


				{/* LISTING DETAILS - START */}
				{/* LISTING DETAILS - START */}
				<div className="details-outer-container">
					<div className="details-main-container">
						{/* LEFT SIDE - START */}
						{/* LEFT SIDE - START */}
						<div className="details-left-container">
							{/* DETAILS CARD | STATS - START */}
							{/* DETAILS CARD | STATS - START */}
							<div className="details-card-stats-container">
								<div className="details-card-stats-padder">
									<div className="details-card-stats-horizontal-splitter">
										<div className="details-card-stats-text-container">
												<div className="details-card-stats-text-top heading-2">
													Entire home hosted by {`${host.firstName}`}
												</div>
												<div className="details-card-stats-text-bottom plain-text">
													{`${listing.maxGuests}`} guests · {`${listing.numBedrooms}`} bedrooms · {`${listing?.numBeds}`} beds · {`${listing?.numBaths}`} baths
												</div>
										</div>
										<div className="details-card-stats-profile-thumbnail">
											<img className="fit-photo" src={require(`../../images/profilepics/${hostIdFormatted}.png`)}/>
										</div>
									</div>
								</div>
							</div>
							{/* DETAILS CARD | STATS - END */}
							{/* DETAILS CARD | STATS - END */}
							
							{/* DETAILS CARD | HIGHLIGHTS - START */}
							{/* DETAILS CARD | HIGHLIGHTS - START */}
							<div className="details-card-higlights-container horizontal-rule-top-border">
								<div className="details-card-higlights-padder plain-text">
									Dedicated workspace
									A common area with wifi that’s well-suited for working.
									Self check-in
									Check yourself in with the lockbox.
									Free cancellation for 48 hours.
								</div>
							</div>
							{/* DETAILS CARD | HIGHLIGHTS - END */}
							{/* DETAILS CARD | HIGHLIGHTS - END */}

							
							{/* DETAILS CARD | DESCRIPTION - START */}
							{/* DETAILS CARD | DESCRIPTION - START */}
							<div className="details-card-description-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text">
									{listing.description}
								</div>
							</div>
							{/* DETAILS CARD | DESCRIPTION - END */}
							{/* DETAILS CARD | DESCRIPTION - END */}

							{/* DETAILS CARD | BED-PHOTOS - START */}
							{/* DETAILS CARD | BED-PHOTOS - START */}
							<div className="details-card-description-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text">
									<div className="sleep-header heading-2">Where you'll sleep</div>
									<div className="sleep-carousel-container">
										<div className="sleep-carousel">
											<div className="carousel-photo"><ListingsShowPhoto listingId={listingId} imageNum={6}/></div>
											<div className="carousel-photo"><ListingsShowPhoto listingId={listingId} imageNum={5}/></div>
											<div className="carousel-photo"><ListingsShowPhoto listingId={listingId} imageNum={4}/></div>
											<div className="carousel-photo"><ListingsShowPhoto listingId={listingId} imageNum={3}/></div>
											<div className="carousel-photo"><ListingsShowPhoto listingId={listingId} imageNum={2}/></div>
											<div className="carousel-photo"><ListingsShowPhoto listingId={listingId} imageNum={1}/></div>

										</div>
									</div>
								</div>
							</div>
							{/* DETAILS CARD | BED-PHOTOS - END */}
							{/* DETAILS CARD | BED-PHOTOS - END */}

							{/* DETAILS CARD | AMENITIES - START */}
							{/* DETAILS CARD | AMENITIES - START */}
							<div className="details-card-amenities-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text">
								What this place offers
								Lake access
								Kitchen
								Wifi
								Dedicated workspace
								Free parking on premises
								Private pool
								Private hot tub
								TV
								Free washer – In unit
								Free dryer – In unit
								</div>
							</div>
							{/* DETAILS CARD | AMENITIES - END */}
							{/* DETAILS CARD | AMENITIES - END */}

							{/* DETAILS CARD | CALENDAR - START */}
							{/* DETAILS CARD | CALENDAR - START */}
							<div className="details-card-amenities-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text">
									<br/><br/><br/><br/><br/>
									CALENDAR
									<br/><br/><br/><br/><br/>
									CALENDAR
									<br/><br/><br/><br/><br/>
								</div>
							</div>
							{/* DETAILS CARD | CALENDAR - END */}
							{/* DETAILS CARD | CALENDAR - END */}


						</div>
						{/* LEFT SIDE - END */}
						{/* LEFT SIDE - END */}

						{/* RIGHT SIDE - START */}
						{/* RIGHT SIDE - START */}
						<div className="details-right-container">
							<div className="floating-form-container">
								<div className="floating-form-inner-container">
									<div className="form-stats-header-container">
										<div>
											<div className="heading-2">${listing.baseNightlyRate}</div> &nbsp; <div className="plain-text">night</div>
										</div>
										<div className="stats-text-small">
											<i class="fa-solid fa-star"></i> &nbsp; 4.93 · 15 reviews
										</div>
									</div>
									{/* FORM - START */}
									{/* FORM - START */}
									<form className="reservation-form" onSubmit={handleSubmit}>
										<div className="form-inputs">
											<div className="date-inputs">
												<div className="checkin-button">
													<input className="checkin-input" 
														type="date"
														value={checkIn}
														min={minDate()}
														max={checkOut ? dayBefore : null}
														onChange={handleChangeCheckIn}
														required
													/>
													<div className="checkin-placeholder">CHECK-IN</div>
												</div>
												<div className="checkout-button">
													<input className="checkout-input" 
														type="date"
														value={checkOut}
														min={checkIn ? dayAfter : null}
														onChange={handleChangeCheckOut}
														required
													/>
													<div className="checkout-placeholder">CHECK-OUT</div>
												</div>
											</div>
											{numGuestsSelector()}
										</div>
										<br/>
										<button type="submit" 
											className={(sessionUser && buttonClickable) ? `reserve-button plain-text` : `disabled-reserve-button plain-text`}
										>
											Reserve
										</button>
									</form>
									{/* FORM - END */}
									{/* FORM - END */}
									{/* <div className="plain-text report-button-container wont-charged">You won't be charged yet</div> */}
									<div className={`plain-text report-button-container ${bookingConfirmed ? "reservation-complete" : "reservation-incomplete"}`}>
										{bookingConfirmed ? "Reservation complete!" : "What are you waiting for?"}
									</div>
									<div>${listing.baseNightlyRate} x {numNights() ? numNights() : "-"} nights - ${baseTotalCost()}</div>
									<div className="plain-text form-padding-top">Cleaning fee - ${cleaningFee}</div>
									<div className="plain-text form-padding-top form-padding-bottom ">Sparebnb service fee - ${totalServiceFee()}</div>
									<div className="plain-text horizontal-rule-top-border"></div>
									<div className="total-before-taxes plain-text form-padding-top">Total before taxes - ${baseTotalCost() + cleaningFee + totalServiceFee()}</div>
								</div>
								<div className="report-button-container">
									<div className="report-button"><i class="fa-solid fa-flag"></i> &nbsp; Report this listing</div>
								</div>
							</div>
						</div>
						{/* RIGHT SIDE - END */}
						{/* RIGHT SIDE - END */}
						

					</div>
				</div>
				{/* LISTING DETAILS - END */}
				{/* LISTING DETAILS - END */}

				{/* LISTING DETAILS - END */}


				<div className="horizontal-rule-top-border plain-text">
					<br/><br/><br/><br/><br/>
					<div>Reviews</div>
					<br/><br/><br/><br/><br/>
				</div>
				<div className="horizontal-rule-top-border plain-text">
					<br/><br/><br/><br/><br/>
					<div>Maps</div>
					<br/><br/><br/><br/><br/>
				</div>
				<div className="horizontal-rule-top-border plain-text">
					<br/><br/><br/><br/><br/>
					<div>Host details</div>
					<br/><br/><br/><br/><br/>
				</div>
				<div className="horizontal-rule-top-border plain-text">
					<br/><br/><br/><br/><br/>
					<div>Footer</div>
					<br/><br/><br/><br/><br/>
				</div>
			</div>
		</div>
		// </motion.div>
		// </AnimatePresence>
	)
}

export default ListingsShowPage;