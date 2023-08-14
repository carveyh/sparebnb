import "./ListingsShowPage.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { fetchListing, fetchListings } from "../../store/listings";
import { fetchUser } from "../../store/user";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { useState } from "react";
import { clearAllReservations, createReservation, fetchReservations } from "../../store/reservation";

import {AnimatePresence, motion} from "framer-motion";
import { fetchResReviewsForListing } from "../../store/reservation_reviews";

// Relevant Components
import { ListingsShowPhoto } from "./ListingsShowPhoto";
import { ReviewsSubCategories } from "./ReviewsSubCategories";
import { ReviewsSnippetsMain } from "./ReviewsSnippetsMain";
import { ReviewsModal } from "./ReviewsModal";
import { Modal } from "../../context/Modal";
import * as ListingFees from "./ListingFees"
import { Redirect } from "react-router-dom";
import Map from "../SpareMap/SpareMap.js"
import ListingsShowCalendar from "./ListingsShowCalendar";

const ListingsShowPage = (props) => {
	const dispatch = useDispatch();
	const { listingId } = useParams()
	const sessionUser = useSelector(state => state.session?.user)
	const listing = useSelector(state => state.entities?.listings ? state.entities.listings[`${listingId}`] : {})
	const host = useSelector(state => state.entities?.users ? state.entities.users[`${listing?.hostId}`] : {})
	// const reservations = useSele
	const hostIdFormatted = formatTwoDigitNumberString(host?.id);	

	// const [checkIn, setCheckIn] = useState("");
	// const [checkOut, setCheckOut] = useState("");
	const [checkIn, setCheckIn] = useState(new Date());
	const [checkOut, setCheckOut] = useState(new Date());
	// const [checkIn, setCheckIn] = useState(undefined);
	// const [checkOut, setCheckOut] = useState(undefined);
	const [numGuests, setNumGuests] = useState(1);
	const [dayAfter, setDayAfter] = useState();
	const [dayBefore, setDayBefore] = useState();
	const [errors, setErrors] = useState([]);
	const [bookingConfirmed, setBookingConfirmed] = useState(false);
	const [buttonClickable, setButtonClickable] = useState(true);
	const [currentSleepPhotoNum, setCurrentSleepPhotoNum] = useState(1);
	const [disabledToolTipRunning, setDisabledToolTipRunning] = useState(false);
	const [showDateModal, setShowDateModal] = useState(false);

	// Review modal
	const [showReviewsModal, setShowReviewsModal] = useState(false);
	// Disables page scrolling if a modal is open!
	if(showReviewsModal){
		// This was working fine before, but as of 7/20, it will cause site to expand to cover the missing scroll bar...need to check how to prevent this change in layout on page.
		// document.body.style.overflow = "hidden";
		document.querySelector('body').style.overflowY = "hidden";
	} else {
		// document.body.style.overflow = "scroll";
		document.querySelector('body').style.overflowY = "scroll";
	}

	// !!! NEED TO CHANGE THIS ONE WE HAVE DYNAMIC LISTINGS PHOTOS!!! FOR NOW EACH LISTING HAS 6 PHOTOS
	const sleepPhotoTotal = 6;
	const sleepPhotoPairsTotal = Math.round(sleepPhotoTotal / 2.0)

	const prevSleepBtn = useRef(null);
	const nextSleepBtn = useRef(null);

	const reserveBtn = useRef(null);

	// calendar modal
	const calModalRef = useRef(null);
		
	// const cleaningFee = parseInt(listing?.baseNightlyRate / 4);
	const cleaningFee = ListingFees.cleaningFee(listing?.baseNightlyRate);
	// const baseServiceFee = 14;
	const baseServiceFee = ListingFees.baseServiceFee(listing?.baseNightlyRate);

	useEffect(() => {
		// Add this line to try to always be at top of a page when navigationg from a dff one
		window.scrollTo(0, 0);
		dispatch(fetchListing(listingId))
			.then(() => {
				dispatch(clearAllReservations())
				dispatch(fetchReservations({id:listingId, type: "listing"}))
				dispatch(fetchResReviewsForListing(listingId))
			})
			.catch(() => {
				// 
			})
	}, [])

	

	const handleChangeCheckIn = e => {
		const dateString = e.target.value;
		const formattedDateString = dateString.split('-').join('/')
		const newDate = new Date(formattedDateString);
		setCheckIn(newDate);
		// setCheckIn(e.target.value);
		setDayAfter(daysApartCalculator(e.target.value, 2))

		if(newDate > checkOut){
			setCheckOut(newDate)
			document.querySelector(".checkout-input").focus();
			document.querySelector(".checkout-input").showPicker();
		}

		// Not working great, if you click up and down on month selector the date input automatically selects a date,
		// this will cause shift in focus
		// if(!checkOut) {
		// 	const inputToFocus = document.querySelector(".checkout-input");
		// 	inputToFocus.focus();
		// 	inputToFocus.showPicker();
		// };
	}

	const handleChangeCheckOut = e => {
		const dateString = e.target.value;
		const formattedDateString = dateString.split('-').join('/')
		const newDate = new Date(formattedDateString);
		setCheckOut(newDate);
		// setCheckOut(e.target.value);
		setDayBefore(daysApartCalculator(e.target.value, -0));
		// Not working great, if you click up and down on month selector the date input automatically selects a date,
		// this will cause shift in focus
		// if(!checkIn) {
		// 	const inputToFocus = document.querySelector(".checkin-input");
		// 	inputToFocus.focus();
		// 	inputToFocus.showPicker();
		// };
	}

	const handleToggleDateModal = (e) => {
		setShowDateModal(true)
	}

	const handleClearDates = () => {
		const newDate = new Date()
		setCheckIn(newDate)
		setCheckOut(newDate)
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
		// if(!checkIn || !checkOut) return null;
		// const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
		// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		// return diffDays
		return ListingFees.numNights(checkIn, checkOut);
	}

	const formatDate = (date) => {
		const dateParts = date.toString().split(" ").slice(1, 4)
		dateParts[1] = dateParts[1].concat(",")
		return dateParts.join(" ")
	}

	const baseTotalCost = () => {
		return numNights() ? numNights() * listing?.baseNightlyRate : listing?.baseNightlyRate;
	}

	const totalServiceFee = () => {
		return numNights() ? numNights() * baseServiceFee : baseServiceFee;
	}

	const formattedOverallRating = () => {
		const twoDigit = listing?.averageRatings.overallRating.toFixed(2)
		const oneDigit = listing?.averageRatings.overallRating.toFixed(1)
		return (twoDigit === oneDigit + '0') ? oneDigit : twoDigit;
	}

	const formattedNumReviews = () => {
		return (listing?.numRatings !== 1) ? listing?.numRatings + " reviews" : listing?.numRatings + " review" 
	}

	const mouseDownReserveBtn = (e) => {
		if(!sessionUser && !disabledToolTipRunning) {
			setDisabledToolTipRunning(true)
			const tooltip = document.querySelector('.reserve-btn-tooltip');
			tooltip.classList.add('reserve-btn-tooltip-visible');
			setTimeout(() => {
				tooltip.classList.add('reserve-btn-tooltip-recede');
			}, 1400)
			setTimeout(() => {
				tooltip.classList.remove('reserve-btn-tooltip-visible');
				tooltip.classList.remove('reserve-btn-tooltip-recede');
				setDisabledToolTipRunning(false)
			}, 2100)
		}

		if(!sessionUser || !buttonClickable) {
			return
		}
		e.preventDefault();
		e.currentTarget.classList.add("mouse-down-reserve-btn");
		document.addEventListener("mouseup", mouseUpReserveBtn) //add/rmv elisteners require exact reference...so separate function names
	}

	const mouseUpReserveBtn = (e) => {
		document.removeEventListener("mouseup", mouseUpReserveBtn);
		reserveBtn.current.classList.remove("mouse-down-reserve-btn");
		if(e.target === reserveBtn.current || e.target.parentElement === reserveBtn.current) handleSubmit(e);
	}
	console.log(showDateModal)
	const handleSubmit = (e) => {
		e.preventDefault();
		if(!sessionUser || !buttonClickable) {
			return
		} else {

			// If form inputs are not fully complete, force focus on form inputs in logical order: checkin, checkout, guests count.
			// const emptyCheckin = (checkIn === "")
			// const emptyCheckout = (checkOut === "")
			// if(emptyCheckin || emptyCheckout) {
			// 	// let inputToFocus;
			// 	// if(emptyCheckin) {
			// 	// 	inputToFocus = document.querySelector(".checkin-input");
			// 	// } else if(emptyCheckout) {
			// 	// 	inputToFocus = document.querySelector(".checkout-input");
			// 	// }
			// 	// inputToFocus.focus();
			// 	// inputToFocus.showPicker();
			// 	// setShowDateModal(true);
			// 	// return;
			// }
			// if(checkIn.toString() === checkOut.toString()) {
			if(numNights() <= 0) {
				console.log(numNights())
				// console.log(showDateModal)
				// document.querySelector(".checkin-input").focus();
				// document.querySelector(".checkin-input").showPicker();
				setShowDateModal(true);
				// handleToggleDateModal();
				return
			}
			

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
						handleClearDates();
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
			options.push(<option key={i} value={i}>{i}</option>)
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

	// LOGIC FOR SLEEP PHOTOS CAROUSEL - START
	// LOGIC FOR SLEEP PHOTOS CAROUSEL - START

	const mouseDownSleepBtn = (direction) => (e) => {
		e.currentTarget.classList.add("sleep-button-pressed");
		if(direction === "prev") {
			document.addEventListener("mouseup", prevPhoto) //add/rmv elisteners require exact reference...so separate function names
		} else {
			document.addEventListener("mouseup", nextPhoto)
		}
	}

	const prevPhoto = (e) => {
		document.removeEventListener("mouseup", prevPhoto);
		prevSleepBtn.current.classList.remove("sleep-button-pressed");
		if(e.target === prevSleepBtn.current || e.target.parentElement === prevSleepBtn.current) shiftPhoto("prev");
	}

	const nextPhoto = (e) => {
		document.removeEventListener("mouseup", nextPhoto);
		nextSleepBtn.current.classList.remove("sleep-button-pressed");
		if(e.target === nextSleepBtn.current || e.target.parentElement === nextSleepBtn.current) shiftPhoto("next");
	}

	const shiftPhoto = (direction) => {
		const carousel = document.querySelector(".sleep-carousel")
		const carouselPhotos = carousel.querySelectorAll(".carousel-photo")
		const photoLength = carouselPhotos[0].offsetWidth + 16

		// Note: currentPhotoNum is 0-indexed, represents how many photos away from carousel start we are.
		const currentPhotoNum = Math.round(carousel.scrollLeft / (carouselPhotos[0].offsetWidth + 16));

		let numChange;
		let newPhotoNum;
		if(direction === "prev") {
			if(currentPhotoNum === 0) { //if already at first photo, no change
				numChange = 0;
			} else {
				if(currentPhotoNum % 2 !== 0) numChange = -1;
				else numChange = -2;
			}
		} else if(direction === "next") { 
			if(currentPhotoNum >= (sleepPhotoTotal - 2)) { //if already at last photo, no change
				numChange = 0;
			} else {
				if(sleepPhotoTotal % 2 !== 0 && currentPhotoNum === sleepPhotoTotal - 3) numChange = 1;
				else numChange = 2;
			}
		}
		newPhotoNum = currentPhotoNum + numChange;
		carousel.scroll({left: newPhotoNum * photoLength, behavior: 'smooth'})

		setCurrentSleepPhotoNum(Math.round((newPhotoNum) / 2.0) + 1);
	}

	// LOGIC FOR SLEEP PHOTOS CAROUSEL - END
	// LOGIC FOR SLEEP PHOTOS CAROUSEL - END

	// if(!listing) return <Redirect to="/" /> 
	if(!listing || !host) return null;

	return (
		<>
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
									{listing.numRatings >= 3 && 
									<>
										<span className="star-icon"><i className="fa-solid fa-star"></i></span>
										<span className="header-rating">{formattedOverallRating()} ·</span>
									</>
									}
									{/* <span className="header-review-count">15 reviews</span> */}
									{listing.numRatings > 0 && <span onClick={e => setShowReviewsModal(true)} className="header-review-count">{formattedNumReviews()}</span>}
								</span>
								{listing.numRatings > 0 && <span className="rating-review-stats stats-text-small lower-dot">·</span>}
								<span className="rating-review-stats stats-text-small">{`${listing.city}, ${listing.state}, United States`}</span>
							</div>
							<div className="show-header-buttons stats-text-small">
								<div className="show-header-btn">
									<i className="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;<span className="show-header-btn-text">Share</span>
								</div>
								{/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
								<div className="show-header-btn show-save-btn">
									<i className="fa-regular fa-heart"></i>&nbsp;&nbsp;<span className="show-header-btn-text">Save</span>
								</div>
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
													{`${listing.maxGuests}`} guest{listing.maxGuests > 1 && 's'} · {`${listing.numBedrooms}`} bedroom{listing.numBedrooms > 1 && 's'} · {`${listing?.numBeds}`} bed{listing.numBeds > 1 && 's'} · {`${listing?.numBaths}`} bath{listing.numBaths > 1 && 's'}
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
								<div className="details-card-higlights-padder plain-text listing-features-list">
									{/* CARD #1 */}
									<div className="listing-feature-card">
										<div className="listing-feature-icon">
											<i class="fa-solid fa-wifi"></i>
										</div>
										<div className="listing-feature-text">
											<div className="listing-feature-header">
												Dedicated workspace		
											</div>
											<div className="listing-feature-desc">
												A common area with wifi that’s well-suited for working.
											</div>
										</div>	
									</div>
									{/* CARD #2 */}
									<div className="listing-feature-card">
										<div className="listing-feature-icon">
											<i class="fa-solid fa-door-open"></i>
										</div>
										<div className="listing-feature-text">
											<div className="listing-feature-header">
												Self check-in
											</div>
											<div className="listing-feature-desc">
												Check yourself in with the lockbox.
											</div>
										</div>	
									</div>
								</div>
							</div>
							{/* DETAILS CARD | HIGHLIGHTS - END */}
							{/* DETAILS CARD | HIGHLIGHTS - END */}

							
							{/* DETAILS CARD | DESCRIPTION - START */}
							{/* DETAILS CARD | DESCRIPTION - START */}
							<div className="details-card-description-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text listing-show-description-text">
									{listing.description}
								</div>
							</div>
							{/* DETAILS CARD | DESCRIPTION - END */}
							{/* DETAILS CARD | DESCRIPTION - END */}

							{/* DETAILS CARD | BED-PHOTOS - START */}
							{/* DETAILS CARD | BED-PHOTOS - START */}
							<div className="details-card-description-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text">
									<div className="sleep-header heading-2">
										<span className="sleep-text">Where you'll sleep </span>
										<div className="sleep-buttons-container">
											<span className="sleep-counter">{`${currentSleepPhotoNum} / ${sleepPhotoPairsTotal}`}</span>
											{/* <div className="sleep-button" onMouseDown={mouseDownSleepBtn} onMouseUp={(shiftSleepPhoto)("prev")}><i class="fa-solid fa-chevron-left"></i></div> */}
											{/* <div className="sleep-button" ref={prevSleepBtn} onMouseDown={(mouseDownSleepBtn)("prev")} ><i class="fa-solid fa-chevron-left"></i></div> */}
											<div className="sleep-button" ref={prevSleepBtn} onMouseDown={mouseDownSleepBtn("prev")} ><i class="fa-solid fa-chevron-left"></i></div>
											<div className="sleep-button" ref={nextSleepBtn} onMouseDown={mouseDownSleepBtn("next")} ><i class="fa-solid fa-chevron-right"></i></div>
										</div>
									</div>
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
							{/* <div className="details-card-amenities-container horizontal-rule-top-border">
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
							</div> */}
							{/* DETAILS CARD | AMENITIES - END */}
							{/* DETAILS CARD | AMENITIES - END */}

							{/* DETAILS CARD | CALENDAR - START */}
							{/* DETAILS CARD | CALENDAR - START */}
							<div className="details-card-amenities-container horizontal-rule-top-border">
								<div className="show-page-general-padder plain-text">
									<div className="heading-2 ">
										{numNights() > 0 ? 
											`${numNights()} nights in ${listing.city}`
											: 
											checkIn === "" ? 
												"Select check-in date"
												:
												"Select checkout date"
										}
									</div>
									<div className="listing-show-calendar-subtitle">
										{numNights() > 0 ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : `Add your travel dates for exact pricing`}
									</div>
									<div className="listing-calendars-box">
										<ListingsShowCalendar 
											checkIn={checkIn} 
											setCheckIn={setCheckIn} 
											checkOut={checkOut}
											setCheckOut={setCheckOut}
										/>
									</div>
									<div className="calendar-clear-dates-container">
										<div onClick={handleClearDates} className="clear-dates-button">Clear dates</div>
									</div>
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
											<div className="heading-2">${listing?.baseNightlyRate}</div> &nbsp; <div className="plain-text">night</div>
										</div>
										<div className="stats-text-small">
											{listing.numRatings >= 3 && 
											<>
												<i className="fa-solid fa-star"></i> &nbsp;
												{formattedOverallRating()} ·&nbsp;
											</>
											}
											 {listing.numRatings > 0 && <div onClick={e => setShowReviewsModal(true)} className="form-num-reviews">{formattedNumReviews()}</div>}
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
														value={checkIn !== "" ? checkIn?.toISOString().slice(0,10) : ""}
														min={minDate()}
														max={checkOut ? dayBefore : null}
														onChange={handleChangeCheckIn}
														required
														onClick={e => setShowDateModal(true)}
														readOnly
													/>
													<div className="checkin-placeholder">CHECK-IN</div>
												</div>
												<div className="checkout-button">
													<input className="checkout-input" 
														type="date"
														// type="text"
														value={checkOut?.toISOString().slice(0,10)}
														// value={formatDate(checkOut)}
														min={checkIn ? dayAfter : daysApartCalculator(minDate(), 2)}
														onChange={handleChangeCheckOut}
														required
														onClick={e => setShowDateModal(true)}
														readOnly
													/>
													<div className="checkout-placeholder">CHECK-OUT</div>
												</div>
												{showDateModal && 
													<div ref={calModalRef} className="listing-date-modal-container">
														<ListingsShowCalendar 
															checkIn={checkIn} 
															setCheckIn={setCheckIn} 
															checkOut={checkOut}
															setCheckOut={setCheckOut}
															modal={true}
															calModalRef={calModalRef}
															showDateModal={showDateModal}
															setShowDateModal={setShowDateModal}
															handleClearDates={handleClearDates}
														/>
													</div>
												}
											</div>
											{numGuestsSelector()}
										</div>
										<br/>
										<div className="reserve-button-container">
											<div className="reserve-btn-tooltip">Sign in to book your adventure</div>
											<button type="submit" 
												ref={reserveBtn}
												onClick={handleSubmit}
												onMouseDown={mouseDownReserveBtn}
												className={(sessionUser && buttonClickable) ? `reserve-button plain-text` : `disabled-reserve-button plain-text`}
											>
												{(numNights() > 0) ? `Reserve` : `Check availability` }
											</button>
											
										</div>
									</form>
									{/* FORM - END */}
									{/* FORM - END */}
									{/* <div className="plain-text report-button-container wont-charged">You won't be charged yet</div> */}
									{numNights() > 0 && <>
										<div className={`plain-text report-button-container ${bookingConfirmed ? "reservation-complete" : "reservation-incomplete"}`}>
											{bookingConfirmed ? "Reservation complete!" : "What are you waiting for?"}
										</div>
										<div className="reserve-form-price-line"><span>${listing?.baseNightlyRate} x {numNights() ? numNights() : "-"} nights</span> <span>${baseTotalCost()}</span></div>
										<div className="reserve-form-price-line plain-text form-padding-top"><span>Cleaning fee</span> <span>${cleaningFee}</span></div>
										<div className="reserve-form-price-line plain-text form-padding-top form-padding-bottom "><span>Sparebnb service fee</span> <span>${totalServiceFee()}</span></div>
										<div className="plain-text horizontal-rule-top-border"></div>
										<div className="reserve-form-price-line total-before-taxes plain-text form-padding-top"><span>Total before taxes</span> <span>${baseTotalCost() + cleaningFee + totalServiceFee()}</span></div>
									</>}
								</div>
								<div className="report-button-container">
									<a target="_blank" href="https://www.linkedin.com/in/carvey-hor/"><div className="report-button"><i className="fa-solid fa-flag"></i> &nbsp; <span className="report-button-text">Report this listing</span></div></a>
									{/* <div className="report-button"><i className="fa-solid fa-flag"></i> &nbsp; Report this listing</div> */}
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

				{/* REVIEWS - START */}
				{/* REVIEWS - START */}
				<div className="horizontal-rule-top-border plain-text">
					<div className="show-page-general-padder show-page-review-section-padder">
						<div className="heading-2 review-header">
							{listing.numRatings === 0 ? <div>No reviews (yet)</div>
								: 
								<div className="review-header-toprow">
									{listing.numRatings >= 3 && 
										<>
											<div className="review-star-container"><i className="fa-solid fa-star"></i></div> 
											{`${formattedOverallRating()}`} ·&nbsp;
										</>
									}
									{formattedNumReviews()}
								</div> 
							}
							{(listing.numRatings < 3 && listing.numRatings > 0) && <div className="under-3-reviews-placeholder">Average rating will appear after 3 reviews</div>}
						</div>
						
						{listing.numRatings >= 3 && <ReviewsSubCategories ratings={listing.averageRatings} />}

						{listing.numRatings > 0 && <ReviewsSnippetsMain listingId={listing.id} setShowReviewsModal={setShowReviewsModal} />}
					
					</div>
				</div>
			{/* REVIEWS - END */}
			{/* REVIEWS - END */}

				<div className="horizontal-rule-top-border plain-text">
					<div className="listing-show-map-header heading-2">
						Where you'll be
					</div>
					<div className="listing-show-map-subheader">
						{`${listing.city}, ${listing.state}, United States`}
					</div>
					<Map isLoaded={props.isLoaded} zoom={14} center={{lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) }}/>
					<br/><br/><br/><br/><br/>
				</div>

				{/* OMITTED: Host details from airbnb */}

				{/* <div className="horizontal-rule-top-border plain-text">
					<br/><br/><br/><br/><br/>
					<div>Footer</div>
					<br/><br/><br/><br/><br/>
				</div> */}
			</div>
		</div>
		
		{showReviewsModal && <Modal onClose={e => setShowReviewsModal(false)}>
			<ReviewsModal listingId={listing.id} setShowReviewsModal={setShowReviewsModal}/>
		</Modal>}

		</>
	)
}

export default ListingsShowPage;