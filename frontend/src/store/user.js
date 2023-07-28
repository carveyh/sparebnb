import csrfFetch from "./csrf";

// ACTION TYPE CONSTANTS

export const RECEIVE_USER = "users/RECEIVE_USER"
export const RECEIVE_USERS = "users/RECEIVE_USERS"

// REDUX ACTION CREATORS

export const receiveUser = (user) => ({
	type: RECEIVE_USER,
	user
})

export const receiveUsers = (users) => ({
	type: RECEIVE_USERS,
	users
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

export const fetchUsers = () => async dispatch => {
	// COMPLETE LATER
}

// USER REDUCER
const usersReducer = (state = {}, action) => {
	Object.freeze(state);
	switch(action.type) {
		case RECEIVE_USER:
			return {[action.user.id]: action.user }
		case RECEIVE_USERS:
			return {...state, ...action.users }
		default:
			return state;
	}
}

export default usersReducer;