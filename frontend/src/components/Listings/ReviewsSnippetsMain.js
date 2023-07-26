import "./ReviewsSnippetsMain.css";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { clearAllResReviews, fetchResReviewsForListing } from "../../store/reservation_reviews";
import { fetchReservations } from "../../store/reservation";
import { useDispatch } from "react-redux";

export const ReviewSnippetIndividual = ({review, endDate, truncated=true, setShowReviewsModal}) => {
	const [showMore, setShowMore] = useState(false);
	useEffect(() => {
		const snippetBody = document.querySelector(`.snippet-body-${review.id}`);
		if(snippetBody?.scrollHeight > snippetBody?.clientHeight) setShowMore(true);
	}, [])

	return (
		<div className={`review-snippet-box ${truncated && `review-snippet-box-truncated`}`}>
			<div className="review-snippet-container-inner">
				<div className="snippet-header">
					<div className="snippet-photo">
						<img className="fit-photo" src={require(`../../images/profilepics/${formatTwoDigitNumberString((review.reviewerId % 12) + 1)}.png`)} />
					</div>
					<div className="snippet-header-box">
						<div className="guest-first-name">{review.reviewerFirstName}</div>
						<div className="snippet-res-month-yr">{endDate}</div>
					</div>
				</div>
				<div className={`snippet-body ${truncated && `snippet-body-truncated`} snippet-body-${review.id}`}>{review.body}</div>
				<div className="snippet-more-btn">
					{(showMore && truncated) && <><div onClick={e => setShowReviewsModal(true)} className="show-more-text">Show more</div> <i class="fa-solid fa-chevron-right"></i></>}
				</div>
			</div>
		</div>
	)
}

export const ReviewsSnippetsMain = ({listingId, setShowReviewsModal}) => {
	const dispatch = useDispatch();

	const reservations = Object.values(useSelector(state => state.entities.reservations ? state.entities.reservations : {}))
	const reviews = Object.values(useSelector(state => state.entities.resReviews ? state.entities.resReviews : {}))
	reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))

	useEffect(() => {
		dispatch(clearAllResReviews())
		dispatch(fetchResReviewsForListing(listingId));
		dispatch(fetchReservations({ id:listingId, type:"listing"}));
	}, [])

	const reviewSnippets = reviews?.slice(0,6).map(review => {
		const reservation = reservations.find(res => res.id === review.reservationId)
		return (
			<ReviewSnippetIndividual review={review} endDate={reservation?.endDate} truncated={true} setShowReviewsModal={setShowReviewsModal} />
		)
	})

	return (
		// <div className="reviews-snippets-container-main">
		// 	<div className="review-snippet-box"></div>
		// </div>
		<>
			<div className="reviews-snippets-container-main">
				{reviewSnippets}
				{/* <ReviewSnippetIndividual /> */}
				{/* <ReviewSnippetIndividual /> */}
				{/* <ReviewSnippetIndividual /> */}
			</div>
			<div className="all-reviews-btn-container">
				{reviews.length > 6 &&
					<div onClick={e => setShowReviewsModal(true)} className="all-reviews-btn">
						Show all {reviews.length} reviews
					</div>
				}
			</div>
		</>
	)
}