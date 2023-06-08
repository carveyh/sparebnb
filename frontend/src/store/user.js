import csrfFetch from "./csrf";

// ACTION TYPE CONSTANTS

export const RECEIVE_USER = "users/RECEIVE_USER"

// REDUX ACTION CREATORS

export const receiveUser = (user) => ({
	type: RECEIVE_USER,
	user
})

// REDUX THUNK ACTION CREATORS

export const fetchUser = (userId) => async dispatch => {
	const res = await csrfFetch(`/api/users/${userId}`);
	if(res.ok) {
		const data = await res.json();
		dispatch(receiveUser(data.user))
	}
	return res;
}

// SESSION REDUCER
const usersReducer = (state = {}, action) => {
	Object.freeze(state);
	switch(action.type) {
		case RECEIVE_USER:
			return {[action.user.id]: action.user }
		default:
			return state;
	}
}

export default usersReducer;