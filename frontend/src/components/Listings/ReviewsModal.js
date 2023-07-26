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





	return (
		<div className="reviews-modal-outer-container">
			<div className="reviews-modal-forehead"></div>
			<div className="reviews-modal-non-forehead">
				{reviewSnippets}
			</div>
		</div>
	)
}