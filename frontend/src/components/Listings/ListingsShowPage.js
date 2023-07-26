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
import { createReservation } from "../../store/reservation";

import {AnimatePresence, motion} from "framer-motion";
import { fetchResReviewsForListing } from "../../store/reservation_reviews";

// Relevant Components
import { ListingsShowPhoto } from "./ListingsShowPhoto";
import { ReviewsSubCategories } from "./ReviewsSubCategories";
import { ReviewsSnippetsMain } from "./ReviewsSnippetsMain";
import { ReviewsModal } from "./ReviewsModal";
import { Modal } from "../../context/Modal";

const ListingsShowPage = (props) => {
	const dispatch = useDispatch();
	const { listingId } = useParams()
	const sessionUser = useSelector(state => state.session?.user)
	const listing = useSelector(state => state.entities?.listings ? state.entities.listings[`${listingId}`] : {})
	const host = useSelector(state => state.entities?.users ? state.entities.users[`${listing?.hostId}`] : {})
	const hostIdFormatted = formatTwoDigitNumberString(host?.id);	

	const [checkIn, setCheckIn] = useState();
	const [checkOut, setCheckOut] = useState();
	const [numGuests, setNumGuests] = useState(1);
	const [dayAfter, setDayAfter] = useState();
	const [dayBefore, setDayBefore] = useState();
	const [errors, setErrors] = useState([]);
	const [bookingConfirmed, setBookingConfirmed] = useState(false);
	const [buttonClickable, setButtonClickable] = useState(true);
	const [currentSleepPhotoNum, setCurrentSleepPhotoNum] = useState(1);

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

	const cleaningFee = parseInt(listing?.baseNightlyRate / 4);
	const baseServiceFee = 14;

	useEffect(() => {
		// Add this line to try to always be at top of a page when navigationg from a dff one
		window.scrollTo(0, 0);
		dispatch(fetchListing(listingId));
		dispatch(fetchResReviewsForListing(listingId));
	}, [])


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
		return numNights() ? numNights() * listing?.baseNightlyRate : listing?.baseNightlyRate;
	}

	const totalServiceFee = () => {
		return numNights() ? numNights() * baseServiceFee : baseServiceFee;
	}

	// REVIEWS DISPLAY DATA - START
	// Be able to parse return string in 3 different locations: 
	// (1) Page header
	// (2) Create res box top-right corner
	// (3) Reviews section 

	const formattedOverallRating = () => {
		const twoDigit = listing?.averageRatings.overallRating.toFixed(2)
		const oneDigit = listing?.averageRatings.overallRating.toFixed(1)
		return (twoDigit === oneDigit + '0') ? oneDigit : twoDigit;
	}

	const formattedNumReviews = () => {
		return (listing?.numRatings !== 1) ? listing?.numRatings + " reviews" : listing?.numRatings + " review" 
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
								<i className="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;Share 
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<i className="fa-regular fa-heart"></i>&nbsp;&nbsp;Save
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
									<div>${listing?.baseNightlyRate} x {numNights() ? numNights() : "-"} nights - ${baseTotalCost()}</div>
									<div className="plain-text form-padding-top">Cleaning fee - ${cleaningFee}</div>
									<div className="plain-text form-padding-top form-padding-bottom ">Sparebnb service fee - ${totalServiceFee()}</div>
									<div className="plain-text horizontal-rule-top-border"></div>
									<div className="total-before-taxes plain-text form-padding-top">Total before taxes - ${baseTotalCost() + cleaningFee + totalServiceFee()}</div>
								</div>
								<div className="report-button-container">
									<div className="report-button"><i className="fa-solid fa-flag"></i> &nbsp; Report this listing</div>
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
						
						<ReviewsSubCategories ratings={listing.averageRatings} />

						<ReviewsSnippetsMain listingId={listing.id} setShowReviewsModal={setShowReviewsModal} />
					
					</div>
				</div>
			{/* REVIEWS - END */}
			{/* REVIEWS - END */}

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
		
		{showReviewsModal && <Modal onClose={e => setShowReviewsModal(false)}>
			<ReviewsModal listingId={listing.id} setShowReviewsModal={setShowReviewsModal}/>
		</Modal>}

		</>
	)
}

export default ListingsShowPage;