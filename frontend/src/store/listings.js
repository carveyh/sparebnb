import csrfFetch from "./csrf";

// ACTION TYPE CONSTANTS
export const RECEIVE_LISTINGS = "listings/RECEIVE_LISTINGS"
export const RECEIVE_LISTING = "listings/RECEIVE_LISTING"

// REDUX ACTION CREATORS
export const receiveListings = listings => ({
	type: RECEIVE_LISTINGS,
	listings
})

export const receiveListing = listing => ({
	type: RECEIVE_LISTING,
	listing
})

// REDUX THUNK ACTION CREATORS
export const fetchListings = (category) => async dispatch => {
	// IMPLEMENT BACKEND FILTERING QUERY STRING
	// let requestString; 
	// URLSearchParams()
	// category ? requestString = 'api/listings/${}' : 'api/listings'
	const res = await csrfFetch('/api/listings');
	if(res.ok) {
		const data = await res.json();
		dispatch(receiveListings(data.listings))
	}
	return res;
}

export const fetchListing = (listingId) => async dispatch => {
	let url = `/api/listings/${listingId}`;
	const res = await csrfFetch(url);
	// const res = await csrfFetch(`/api/foo`);
	debugger
	if(res.ok) {
		debugger
		const data = await res.json();
		debugger
		dispatch(receiveListing(data.listing));
	}
	return res;
}

// Session Reducer
// How session slice of state's :user gets restored to a currentUser from sessionStorage, if any.
const listingsReducer = (state = {}, action) => {
	Object.freeze(state);
	switch(action.type) {
		case RECEIVE_LISTINGS:
			return action.listings;
		case RECEIVE_LISTING:
			debugger 
			return {[action.listing.id]: action.listing}
			// return {...state, [action.listing.id]: action.listing}
		default:
			return state;
	}
}

export default listingsReducer;