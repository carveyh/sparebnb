import "./ReviewsModal.css";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
// import { clearAllResReviews, fetchResReviewsForListing } from "../../store/reservation_reviews";
// import { fetchReservations } from "../../store/reservation";
import { useDispatch } from "react-redux";

import { ReviewSnippetIndividual } from "./ReviewsSnippetsMain";
import { ReviewsSubCategories } from "./ReviewsSubCategories";
import { fetchListing } from "../../store/listings";



export const ReviewsModal = ({listingId, setShowReviewsModal, specificReviewId}) => {

	const dispatch = useDispatch();

	const listing = useSelector(state => state.entities?.listings ? state.entities.listings[`${listingId}`] : {})
	const reservations = Object.values(useSelector(state => state.entities.reservations ? state.entities.reservations : {}))
	const reviews = Object.values(useSelector(state => state.entities.resReviews ? state.entities.resReviews : {}))

	let specificReviewScores = null;
	if(specificReviewId) {
		const review = reviews.filter(review => review.id === specificReviewId)[0]
		specificReviewScores = {
			overallRating: review.overallRating,
			cleanliness: review.cleanliness,
			accuracy: review.accuracy,
			communication: review.communication,
			location: review.location,
			checkin: review.checkin,
			value: review.value,
		}
	}


	reviews.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

	useEffect(() => {
		// dispatch(fetchListing(listingId))
		// dispatch(clearAllResReviews())
		// dispatch(fetchResReviewsForListing(listingId));
		// dispatch(fetchReservations({ id:listingId, type:"listing"}));
	}, [])

	let reviewSnippets = [];

	if(specificReviewId) {
		const review = reviews.filter(review => review.id === specificReviewId)[0]
		const reservation = reservations.find(res => res.id === review.reservationId)
		reviewSnippets.push(
			<ReviewSnippetIndividual review={review} endDate={reservation?.endDate} truncated={false} />
		)
	} else {
		reviewSnippets = reviews?.map(review => {
			const reservation = reservations.find(res => res.id === review.reservationId)
			return (
				<ReviewSnippetIndividual review={review} endDate={reservation?.endDate} truncated={false} />
			)
		})
	}

	const formattedOverallRating = () => {
		let num = listing?.averageRatings.overallRating
		if(specificReviewId){
			num = specificReviewScores.overallRating
		}
		const twoDigit = num.toFixed(2)
		const oneDigit = num.toFixed(1)
		return (twoDigit === oneDigit + '0') ? oneDigit : twoDigit;
	}

	const formattedNumReviews = () => {
		return (listing?.numRatings !== 1) ? listing?.numRatings + " reviews" : listing?.numRatings + " review" 
	}



	return (
		<div className="reviews-modal-outer-container">
			<div className="reviews-modal-forehead">
				<button onClick={e => setShowReviewsModal(false)} className="x-close"><i className="fa-solid fa-x"></i></button>
			</div>
			<div className="reviews-modal-non-forehead">
				<div className="modal-ratings-section">
					

					<div className={`heading-2 review-header review-header-modal`}>
						{listing.numRatings === 0 ? <div>No reviews (yet)</div>
							: 
							<div className="review-header-toprow review-header-toprow-modal">
								{(listing.numRatings >= 3 || specificReviewId) && 
									<>
										<div className="review-star-container rev-star-modal"><i className="fa-solid fa-star"></i></div> 
										{`${formattedOverallRating()}`}{!specificReviewId && ' ·'}&nbsp;
									</>
								}
								{!specificReviewId && formattedNumReviews()}
							</div> 
						}
						{(listing.numRatings < 3 && listing.numRatings > 0 && !specificReviewId) && <div className="under-3-reviews-placeholder">Average rating will appear after 3 reviews</div>}
					</div>
					{specificReviewId ? 
						<ReviewsSubCategories ratings={specificReviewScores} isModal={true} />
						:
						<ReviewsSubCategories ratings={listing.averageRatings} isModal={true} />
					}

				</div>
				<div className="modal-reviews-section">
					<div className="moda-review-search"></div>
					<div className="modal-review-tiles">
						{reviewSnippets}
					</div>
				</div>
			</div>
		</div>
	)
}