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

export const fetchReservations = (listingId) => async dispatch => {
	let requestUrl;
	if(listingId){
		requestUrl = `/api/listings/${listingId}/reservations`;
	} else {
		requestUrl = `/api/reservations`;
	}
	const res = await csrfFetch(requestUrl);
	if(res.ok){
		const data = await res.json();
		dispatchEvent(receiveReservations(data.reservations));
	}
	return res;
}

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
	const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
		method: 'PATCH'
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