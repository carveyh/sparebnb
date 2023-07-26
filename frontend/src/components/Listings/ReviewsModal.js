import "./ReviewsModal.css";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
// import { clearAllResReviews, fetchResReviewsForListing } from "../../store/reservation_reviews";
// import { fetchReservations } from "../../store/reservation";
import { useDispatch } from "react-redux";

import { ReviewSnippetIndividual } from "./ReviewsSnippetsMain";



export const ReviewsModal = ({listingId}) => {

	const dispatch = useDispatch();

	const listing = useSelector(state => state.entities?.listings ? state.entities.listings[`${listingId}`] : {})
	const reservations = Object.values(useSelector(state => state.entities.reservations ? state.entities.reservations : {}))
	const reviews = Object.values(useSelector(state => state.entities.resReviews ? state.entities.resReviews : {}))
	reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))

	useEffect(() => {
		// dispatch(clearAllResReviews())
		// dispatch(fetchResReviewsForListing(listingId));
		// dispatch(fetchReservations({ id:listingId, type:"listing"}));
	}, [])

	const reviewSnippets = reviews?.map(review => {
		const reservation = reservations.find(res => res.id === review.reservationId)
		return (
			<ReviewSnippetIndividual review={review} endDate={reservation?.endDate} truncated={false} />
		)
	})

	const formattedOverallRating = () => {
		const twoDigit = listing?.averageRatings.overallRating.toFixed(2)
		const oneDigit = listing?.averageRatings.overallRating.toFixed(1)
		return (twoDigit === oneDigit + '0') ? oneDigit : twoDigit;
	}

	const formattedNumReviews = () => {
		return (listing?.numRatings !== 1) ? listing?.numRatings + " reviews" : listing?.numRatings + " review" 
	}



	return (
		<div className="reviews-modal-outer-container">
			<div className="reviews-modal-forehead"></div>
			<div className="reviews-modal-non-forehead">
				<div className="modal-ratings-section">
					

					<div className={`heading-2 review-header`}>
						{listing.numRatings === 0 ? <div>No reviews (yet)</div>
							: 
							<div className="review-header-toprow review-header-toprow-modal">
								{listing.numRatings >= 3 && 
									<>
										<div className="review-star-container rev-star-modal"><i className="fa-solid fa-star"></i></div> 
										{`${formattedOverallRating()}`} ·&nbsp;
									</>
								}
								{formattedNumReviews()}
							</div> 
						}
						{(listing.numRatings < 3 && listing.numRatings > 0) && <div className="under-3-reviews-placeholder">Average rating will appear after 3 reviews</div>}
					</div>


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