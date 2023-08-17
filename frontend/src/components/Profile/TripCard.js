import "./TripCard.css"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { Modal } from "../../context/Modal"
import { ReviewsModal } from "../Listings/ReviewsModal"
import { updateReservation, destroyReservation } from "../../store/reservation"
import { formatTwoDigitNumberString } from "../../utils/urlFormatter"
import * as ListingFees from "../Listings/ListingFees";
import { ReviewForm } from "./ReviewForm"
import { destroyResReview } from "../../store/reservation_reviews"

export const TripCard = ({reservation, listing, review, tripType}) => {

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

	const dispatch = useDispatch();
	const [checkIn, setCheckIn] = useState(reservation.startDate)
	const [checkOut, setCheckOut] = useState(reservation.endDate)
	const [numGuests, setNumGuests] = useState(reservation.numGuests)

	const [dayAfter, setDayAfter] = useState(() => {
		const afterStartDate = daysApartCalculator(reservation.startDate, 2);
		const today = minDate();
		return (new Date(afterStartDate) < new Date(today)) ? today : afterStartDate;
	});
	const [dayBefore, setDayBefore] = useState();
	 
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [showReviewForm, setShowReviewForm] = useState(false);

		// Disables page scrolling if a modal is open!
		if(showReviewModal || showReviewForm){
			// This was working fine before, but as of 7/20, it will cause site to expand to cover the missing scroll bar...need to check how to prevent this change in layout on page.
			// document.body.style.overflow = "hidden";
			document.querySelector('body').style.overflowY = "hidden";
		} else {
			// document.body.style.overflow = "scroll";
			document.querySelector('body').style.overflowY = "scroll";
		}

	const monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
	];

	const unChanged = () => checkIn === reservation.startDate && checkOut === reservation.endDate && numGuests.toString() === reservation.numGuests.toString()

	const startDate = new Date(reservation?.startDate)
	const endDate = new Date(reservation?.endDate)
	let startDateMonth;
	if(startDate) startDateMonth = monthNames[startDate?.getMonth()]

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
				<select className={`num-guests-selector `} value={numGuests} onChange={e => setNumGuests(e.target.value)}>
					{options}
				</select>
			</div>
		)
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

	const handleDeleteReview = e => {
		return dispatch(destroyResReview(review.id))
		.then(() => {
			// setReviewComplete(true)
			// setTimeout(() => {
			// 	setShowReviewForm(false)
			// }, 1700)
		})
		.catch(async (res) => {
			// let data;
			// try {
			// 	data = await res.clone().json();
			// } catch {
			// 	data = await res.text()
			// }
			// if(data?.errors) setErrors(data.errors)
			// else if(data) setErrors([data])
			// else setErrors([res.statusText]);
			
		})
	}

	const completedTripDetails = () => {
		const numNights = ListingFees.tripNumNights(reservation.startDate, reservation.endDate);
		const totalCost = reservation.baseNightlyRate *  numNights;
		return (
			<>
				<div className="past-trip-details">
					<div className="past-trip-total-nights">
						<span>Nights: </span>
						<span>{numNights}</span>
					</div>
					<div className="past-trip-total-cost">
						<span>Total cost: </span>
						<span>${totalCost}</span>
					</div>
					<div className="past-trip-guests">
						<span>Guests: </span>
						<span>{reservation.numGuests}</span>
					</div>
				</div>
				<div className="past-trip-controls">
					{review ? 
						<div className="review-update-delete-btns">
							<div className="review-edit-btn"
								onClick={e => setShowReviewForm(true)}
							>
								<div className="past-trip-review-button-inner">
									<div className="trip-card-review-create-icon"><i class="fa-solid fa-pen-to-square"></i></div> <span>Edit</span>
								</div>
							</div>
							<div className="review-del-btn"
								onClick={handleDeleteReview}
							>
								<div className="past-trip-review-button-inner">
								<div className="trip-card-review-create-icon"><i class="fa-solid fa-trash-can"></i></div> <span>Delete</span>
								</div>
							</div>
						</div>
						:
						<div 
							className={`past-trip-review-button ${review ? `show-posted-review-form-btn` : `new-review-form-btn`}`}
							onClick={review ? e => setShowReviewModal(true) : e => setShowReviewForm(true)}
						>
							<div className={`past-trip-review-button-inner`}>
								{review ? 
									<>
										<div className="trip-card-review-complete-icon"><i class="fa-solid fa-check"></i></div> <span>Review Complete</span>
									</> 
									: 
									<><div className="trip-card-review-create-icon"><i class="fa-solid fa-plus"></i></div> <span>Leave a Review</span> </> }
							</div>
						</div>
					}
				</div>
			</>
		)
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
						
						{/* UDPATE FORM - ACTIVE OR UPCOMING TRIPS */}
						{(tripType !== "past") && <div className="update-form-container">
							<form>
								<div className="update-form-inner-container">
									<div className={`update-field trips-update-field ${(tripType === "active") && `disabled-trip-input-container`}`}>
										Check in date:
										{/* <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/> */}
										<input className={`checkin-input trips-date-input ${(tripType === "active") && `disabled-trip-input-field`}`} 
											type="date"
											value={checkIn}
											min={minDate()}
											max={checkOut ? dayBefore : null}
											onChange={handleChangeCheckIn}
											required
											disabled={tripType === "active"} 
										/>
									</div>
									<div className="update-field trips-update-field">
										Check out date:
										{/* <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}/> */}
										<input className={`checkout-input trips-date-input `} 
											type="date"
											value={checkOut}
											min={checkIn ? dayAfter : null}
											onChange={handleChangeCheckOut}
											required
											// disabled={tripType === "active"} 
										/>
									</div>
									<div className="update-field trips-update-field">
										Guests:
											{numGuestsSelector()}
									</div>
									<div className="update-field trips-update-field trip-crud-buttons">
										<input className={unChanged() ? `trip-crud-btn-disabled` : `trip-crud-btn-enabled`} type="button" onClick={handleUpdate} value="Update"/>
										{(tripType !== "active" && tripType !== "past" ) && <input className={`${(tripType === "active") && `disabled-trip-input-field`}`} type="button" id={reservation?.id} onClick={handleDelete} disabled={tripType === "active"} value="Delete"/>}
									</div>
									<div className="update-field trips-update-field trip-card-reset-box">
										{/* <input className={unChanged() ? `trip-crud-btn-disabled` : `trip-crud-btn-enabled`} type="button" onClick={handleUpdate} value="Update"/> */}
										<div id={reservation?.id} onClick={handleReset}><i class="fa-solid fa-rotate-right"></i></div>
									</div>

									
									
								</div>	
							</form>
						</div>}
						{/* UDPATE FORM - ACTIVE OR UPCOMING TRIPS */}

						{/* SUMMARY PANE & REVIEW BUTTONS - PAST TRIPS */}
						{(tripType === "past") && <div className="past-trip-container">
							{completedTripDetails()}
						</div>}
						{/* SUMMARY PANE & REVIEW BUTTONS - PAST TRIPS */}

					</div>
				</div>
				{/* LEFT SIDE */}

				{/* RIGHT SIDE */}
				
					<div className="trip-photo-main">
						{/* <img className="" src={require(`../../images/listings/${listingId}/${imageNum}.png`)} /> */}
						{listing && 
						<Link to={`/listings/${listing?.id}`}>
							<img className="trip-photo-img" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} />
							<div className="hover-overlay"></div>
						</Link>
						
						}
					</div>
				
				{/* RIGHT SIDE */}

			</div>
			{showReviewModal && <Modal onClose={e => setShowReviewModal(false)}>
				<ReviewsModal listingId={listing.id} setShowReviewsModal={setShowReviewModal} specificReviewId={review.id} />
			</Modal>}
			{showReviewForm && <Modal onClose={e => setShowReviewForm(false)}>
				<ReviewForm review={review} reservation={reservation} listing={listing} setShowReviewForm={setShowReviewForm}/>
			</Modal>}
		</>
	)
}