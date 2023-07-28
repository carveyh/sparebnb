import csrfFetch from "./csrf"
import { fetchListings } from "./listings"
import { CLEAR_ALL_RESERVATIONS } from "./reservation"

// ACTION TYPE CONSTANTS
export const RECEIVE_RES_REVIEWS = "reservation_reviews/RECEIVE_RES_REVIEWS"
export const RECEIVE_RES_REVIEW = "reservation_reviews/RECEIVE_RES_REVIEW"
export const REMOVE_RES_REVIEW = "reservation_reviews/REMOVE_RES_REVIEW"
export const CLEAR_ALL_RES_REVIEWS = "reservation_reviews/CLEAR_ALL_RES_REVIEWS"

// OBJECT ACTION CREATORS
export const receiveResReviews = (reviews) => ({
	type: RECEIVE_RES_REVIEWS,
	reviews,
})

export const receiveResReview = (review) => ({
	type: RECEIVE_RES_REVIEW,
	review,
})

export const removeResReview = (reviewId) => ({
	type: REMOVE_RES_REVIEW,
	reviewId
})

export const removeAllResReviewsFromState = () => ({
	type: CLEAR_ALL_RES_REVIEWS
})

// THUNK ACTION CREATORS
// *******************************

export const fetchResReview = (id) => async (dispatch) => {
	const res = await csrfFetch(`/api/reservation_reviews/${id}`);
	if(res.ok){
		const data = await res.json();
		dispatch(receiveResReview(data.reservationReview))
	}
	return res;
}

export const fetchResReviewForReservation = (reservationId) => async (dispatch) => {
	const res = await csrfFetch(`/api/reservations/${reservationId}/reservation_reviews`)
	if(res.ok){
		const data = await res.json();
		dispatch(receiveResReview(data.reservationReview))
	}
	return res;
}

export const fetchResReviewsForListing = (listingId) => async (dispatch) => {
	const res = await csrfFetch(`/api/listings/${listingId}/reservation_reviews`)
	if(res.ok){
		const data = await res.json();
		dispatch(receiveResReviews(data.reservationReviews))
	}
	return res;
}

export const fetchResReviewsForGuest = (guestId) => async (dispatch) => {
	const res = await csrfFetch(`/api/users/${guestId}/reservation_reviews`)
	if(res.ok){
		const data = await res.json();
		dispatch(receiveResReviews(data.reservationReviews))
	}
	return res;
}

// fetchResReviewsForHost(hostId) //DO LATER!

export const createResReview = (review) => async (dispatch) => {
	const res = await csrfFetch(`/api/reservations/${review.reservationId}/reservation_reviews`, {
		method: 'POST',
		body: JSON.stringify(review),
		// body: JSON.stringify({review: review}), // try this if above not work
	})
	if(res.ok){
		const data = await res.json();
		dispatch(receiveResReview(data.reservationReview))
		dispatch(fetchListings())
	}
	return res;
}

export const updateResReview = (review) => async (dispatch) => {
	const res = await csrfFetch(`/api/reservation_reviews/${review.id}`, {
		method: 'PATCH',
		body: JSON.stringify(review),
		// body: JSON.stringify({review: review}), // try this if above not work
	})
	if(res.ok){
		const data = await res.json();
		dispatch(receiveResReview(data.reservationReview))
	}
	return res;
}

export const destroyResReview = (reviewId) => async (dispatch) => {
	const res = await csrfFetch(`/api/reservation_reviews/${reviewId}`, {
		method: 'DELETE',
	})
	dispatch(removeResReview(reviewId))
	return res;
}

export const clearAllResReviews = () => async (dispatch) => {
	dispatch(removeAllResReviewsFromState())
}

// RESERVATION_REVIEWS REDUCER

const reservationReviewsReducer = (state = {}, action) => {
	Object.freeze(state);
	const newState = {...state};
	switch (action.type) {
		case RECEIVE_RES_REVIEWS:
			return {...newState, ...action.reviews};
		case RECEIVE_RES_REVIEW:
			newState[action.review.id] = action.review;
			return newState;
		case REMOVE_RES_REVIEW:
			delete newState[action.reviewId];
			return newState;
		case CLEAR_ALL_RES_REVIEWS:
			return {};
		default:
			return newState;
	}
}

export default reservationReviewsReducer;