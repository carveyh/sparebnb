import "./ReviewForm.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTabIndex } from 'react-tabindex'

import { ReviewStarInput } from "./ReviewStarInput";
import { createResReview } from "../../store/reservation_reviews";

export const ReviewForm = ({reservation, listing, setShowReviewForm}) => {
	const dispatch = useDispatch();
	const tabIndex = useTabIndex();

	const sessionUser = useSelector(state => state.session?.user)
	const listings = Object.values(useSelector(state => state.entities?.listings ? state.entities.listings : {}))
	const hostName = listings.filter(listing => listing.id === reservation.listingId)[0].hostFirstName;

	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const startDate = new Date(reservation?.startDate)
	const endDate = new Date(reservation?.endDate)
	let startDateMonth;
	let endDateMonth;
	if(startDate) startDateMonth = monthNames[startDate?.getMonth()]
	if(endDate) endDateMonth = monthNames[endDate?.getMonth()]

	const [reviewBody, setReviewBody] = useState("");
	const [cleanliness, setCleanliness] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const [communication, setCommunication] = useState(0);
	const [location, setLocation] = useState(0);
	const [checkin, setCheckin] = useState(0);
	const [value, setValue] = useState(0);
	const [overallRating, setOverallRating] = useState(0);

	const [errors, setErrors] = useState({});

	const [formIncomplete, setFormIncomplete] = useState(false);
	const [reviewComplete, setReviewComplete] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// setReviewComplete(true)
		if(reviewBody === "" || [cleanliness, accuracy, communication, location, checkin, value, overallRating].some(rating => rating === 0) ) {
			setFormIncomplete(true)
			return;
		}
		const review = {
			body: reviewBody,
			cleanliness,
			accuracy,
			communication,
			location,
			checkin,
			value,
			overallRating,
			reviewerId: sessionUser.id,
			reservationId: reservation.id
		}
		return dispatch(createResReview(review))
		.then(() => {
			setReviewComplete(true)
			setTimeout(() => {
				setShowReviewForm(false)
			}, 1500)
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

	return(
		<div className="review-form-container">
			<div className="reviews-form-forehead">
			<button onClick={e => setShowReviewForm(false)} className="x-close"><i class="fa-solid fa-x"></i></button>
			</div>
			<div className="reviews-form-non-forehead">
				<form onSubmit={handleSubmit}>
					<div className="review-form-header">
						<div className="show-title heading-1">
							{`${listing?.title}`}
						</div>
						<div className="review-section-subtitle">
							Entire home hosted by {`${hostName}`}
						</div>
						<div className="review-section-subtitle">
							<span>{`${startDateMonth} ${startDate.getDate()}, ${startDate.getFullYear()} - ${endDateMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`}</span>
						</div>
					</div>

					{/*  */}
					<div className="review-form-divider"></div>
					{/*  */}

					<div className="review-form-section review-body-greater-section">
						<div className="review-section-title heading-2">Leave a public review</div>
						<div className="review-section-subtitle">Write a fair, honest review about your stay so future guests know what to expect.</div>
						<div className="review-body-textarea-container">
							<textarea 
								tabIndex={0}
								placeholder="Say a few words about your stay" 
								className="review-body-textarea"
								value={reviewBody}
								onChange={e => setReviewBody(e.target.value)}
							>

							</textarea>
						</div>
						<div className="text-missing-section">
							{(formIncomplete && reviewBody === "") && <div className="form-incomplete-notice"><i className="fa-solid fa-circle-exclamation"></i> Review required</div>}
						</div>
					</div>

					{/*  */}
					<div className="review-form-divider"></div>
					{/*  */}
					<div className="review-ratings-greater-section">
						<div className="review-form-section">
							<div className="review-section-title">Cleanliness</div>
							<div className="review-section-subtitle">Was {listing.title} a clean space?</div>
							<ReviewStarInput rating={cleanliness} setRating={setCleanliness} tabIndex={1} formIncomplete={formIncomplete}/>
						</div> 

						<div className="review-form-section">
							<div className="review-section-title">Accuracy</div>
							<div className="review-section-subtitle">How accurate was {listing.title} compared to the description?</div>
							<ReviewStarInput rating={accuracy} setRating={setAccuracy} tabIndex={2} formIncomplete={formIncomplete}/>
						</div> 

						<div className="review-form-section">
							<div className="review-section-title">Communication</div>
							<div className="review-section-subtitle">How clearly did {hostName} communicate their booking proess, requests, and house rules?</div>
							<ReviewStarInput rating={communication} setRating={setCommunication} tabIndex={3} formIncomplete={formIncomplete}/>
						</div> 

						<div className="review-form-section">
							<div className="review-section-title">Location</div>
							<div className="review-section-subtitle">Did the location of this listing meet your needs?</div>
							<ReviewStarInput rating={location} setRating={setLocation} tabIndex={4} formIncomplete={formIncomplete}/>
						</div> 

						<div className="review-form-section">
							<div className="review-section-title">Check-in</div>
							<div className="review-section-subtitle">How easy was it to check-in?</div>
							<ReviewStarInput rating={checkin} setRating={setCheckin} tabIndex={5} formIncomplete={formIncomplete}/>
						</div> 

						<div className="review-form-section">
							<div className="review-section-title">Value</div>
							<div className="review-section-subtitle">Please rate the value of this listing for the price that it was booked.</div>
							<ReviewStarInput rating={value} setRating={setValue} tabIndex={6} formIncomplete={formIncomplete}/>
						</div> 

						<div className="review-form-section">
							<div className="review-section-title">Overall Rating</div>
							<div className="review-section-subtitle">How was your stay overall?</div>
							<ReviewStarInput rating={overallRating} setRating={setOverallRating} tabIndex={7} formIncomplete={formIncomplete}/>
						</div>
					</div> 

					<div className="review-form-section missing-fields-notice-section">
						{formIncomplete && <div className="form-incomplete-notice">Please complete missing fields</div>}
					</div>

					<div className="review-form-section review-form-submit-section">
						<button type="submit" tabIndex={2} className="review-form-submit" >Submit review</button>
					</div> 
				</form>
			</div>
			{reviewComplete && <div className={`review-complete-display ${reviewComplete && `review-complete-display-active`}`}>
				<div className="review-complete-shimmer review-complete-shimmer-active"></div>
					<span className="review-complete-text">Review complete</span>
			</div>}
		</div>
	)
}