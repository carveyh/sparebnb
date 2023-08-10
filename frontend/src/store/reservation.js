// ACTION TYPE CONSTANTS

import csrfFetch from "./csrf"

export const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS"
export const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION"
export const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION"
export const CLEAR_ALL_RESERVATIONS = "reservations/CLEAR_ALL_RESERVATIONS"

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

export const removeAllReservationsFromState = () => ({
	type: CLEAR_ALL_RESERVATIONS
})

// REDUX THUNK ACTION CREATORS


//Dynamic thunk can take different an options object containing diff string types :)
export const fetchReservations = ({id, type}) => async dispatch => {
	let requestUrl;
	if(id && type === "listing"){
		const listingId = id;
		requestUrl = `/api/listings/${listingId}/reservations`;
	} else if (id && type === "user") {
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
// 	const res = await csrfFetch(requestUrl);
// 	if(res.ok){
// 		const data = await res.json();
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

export const clearAllReservations = () => async dispatch => {
	dispatch(removeAllReservationsFromState());
}

export const updateReservation = (reservation) => async dispatch => {
	const {
		startDate, 
		endDate, 
		numGuests,
		listingId,
		reserverId,
		baseNightlyRate
	} = reservation;

	const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			startDate, 
			endDate, 
			numGuests,
			listingId,
			reserverId,
			baseNightlyRate
		})
	})
	if(res.ok){
		const data = await res.json();
		dispatch(receiveReservation(data.reservation));
	} else {
		// error handling here!
		
	}
	return res; //return res either way
}

export const createReservation = (reservation) => async dispatch => {
	const {
		checkIn, 
		checkOut, 
		numGuests,
		listingId,
		reserverId,
		baseNightlyRate
	} = reservation;
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

// RESERVATIONS REDUCER

const reservationsReducer = (state = {}, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_RESERVATIONS:
			return {...state, ...action.reservations};
			// return {...action.reservations};
		case RECEIVE_RESERVATION:
			return {...state, [action.reservation.id]: action.reservation};
		case REMOVE_RESERVATION:
			const newState = {...state};
			delete newState[action.reservationId];
			return newState;
		case CLEAR_ALL_RESERVATIONS:
			return {};
		default:
			return state;
	}
}

export default reservationsReducer;