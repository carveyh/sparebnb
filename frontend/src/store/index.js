import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';
import listingsReducer from './listings';
import usersReducer from './user';
import reservationsReducer from './reservation';
import reservationReviewsReducer from './reservation_reviews';

const entitiesReducer = combineReducers({
	listings: listingsReducer,
	users: usersReducer,
	reservations: reservationsReducer,
	resReviews: reservationReviewsReducer,
})

const rootReducer = combineReducers({
	session: sessionReducer,
	entities: entitiesReducer,
});

let enhancer;

if(process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
	return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;