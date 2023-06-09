// ACTION TYPE CONSTANTS

import csrfFetch from "./csrf"

export const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS"
export const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION"
export const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION"

// REDUX ACTION CREATORS

export const receiveReservations = (reservations) => ({
	type: RECEIVE_RESERVATIONS,
	reservations
})

export const receiveReservation = (reservation) => ({
	type: RECEIVE_RESERVATION,
	reservation
})

export const removeReservation = (reservationId) => ({
	type: REMOVE_RESERVATION,
	reservationId
})

// REDUX THUNK ACTION CREATORS


//THIS BELOW NOT WORKING - a dynamic fetchReservations that can diff types wildcard.
//REVISIT! 
export const fetchReservations = ({id, type}) => async dispatch => {
	// debugger
	let requestUrl;
	if(id && type === "listing"){
		const listingId = id;
		requestUrl = `/api/listings/${listingId}/reservations`;
	} else if(id && type === "user") {
		// debugger
		const userId = id;
		requestUrl = `/api/users/${userId}/reservations`;
	} else {
		requestUrl = `/api/reservations`;
	}
	const res = await csrfFetch(requestUrl);
	if(res.ok){
		const data = await res.json();
		dispatch(receiveReservations(data.reservations));
	}
	return res;
}

// export const fetchReservations = (userId) => async dispatch => {
// 	let requestUrl;
// 	if(userId){
// 		requestUrl = `/api/users/${userId}/reservations`;
// 	} else {
// 		requestUrl = `/api/reservations`;
// 	}
// 	debugger
// 	const res = await csrfFetch(requestUrl);
// 	if(res.ok){
// 		debugger
// 		const data = await res.json();
// 		debugger
// 		dispatch(receiveReservations(data.reservations));
// 	}
// 	return res;
// }

export const fetchReservation = (reservationId) => async dispatch => {
	const res = await csrfFetch(`/api/reservations/${reservationId}`);
	if(res.ok){
		const data = await res.json();
		dispatch(receiveReservation(data.reservation));
	}
	return res;
}

export const destroyReservation = (reservationId) => async dispatch => {
	const res = await csrfFetch(`/api/reservations/${reservationId}`, {
		method: 'DELETE'
	})
	dispatch(removeReservation(reservationId));
	return res;
}

export const updateReservation = (reservation) => async dispatch => {
	const res = await csrfFetch(`/api/listings/${reservation.listingId}/reservations`, {
		method: 'POST'
	})
	if(res.ok){
		const data = await res.json();
		dispatch(receiveReservation(data.reservation));
	}
	return res;
}

export const createReservation = (reservation) => async dispatch => {
	debugger
	const {
		checkIn, 
		checkOut, 
		numGuests,
		listingId,
		reserverId,
		baseNightlyRate
	} = reservation;
	debugger
	const res = await csrfFetch(`/api/listings/${listingId}/reservations`, {
		method: 'POST',
		body: JSON.stringify({
			startDate: checkIn, 
			endDate: checkOut, 
			numGuests,
			listingId,
			reserverId,
			baseNightlyRate
		})
	})
	if(res.ok){
		const data = await res.json();
		dispatch(receiveReservation(data.reservation));
	}
	return res;
}

// SESSION REDUCER

const reservationsReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_RESERVATIONS:
			return {...state, ...action.reservations};
		case RECEIVE_RESERVATION:
			return {...state, [action.reservation.id]: action.reservation};
		case REMOVE_RESERVATION:
			const newState = {...state};
			delete newState[action.reservationId];
			return newState;
		default:
			return state;
	}
}

export default reservationsReducer;