import "./ListingsIndex.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useHistory } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

// import { Loader } from "@googlemaps/js-api-loader";
import { DistanceMatrixService } from "@react-google-maps/api";


import {AnimatePresence, motion} from "framer-motion";

// export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

const ListingCard = ({distance, listing, num, filter}) => {

	const formattedOverallRating = () => {
		const twoDigit = listing?.averageRatings.overallRating.toFixed(2)
		const oneDigit = listing?.averageRatings.overallRating.toFixed(1)
		return (twoDigit === oneDigit + '0') ? oneDigit : twoDigit;
	}

	return (
		<motion.div key={num.toString() + filter} initial={{opacity:0.0}} animate={{opacity:1, transition:{delay:(num) * 0.035, duration: 0.2, ease:'easeIn'} }} exit={{opacity: 0}}>
		<Link to={`/listings/${listing?.id}`}>
			<div className={`grid-item grid-item-${num}`} >
						{/* IMPLEMENT SAVED LISTINGS LATER!!! AND BRING THIS HEART BACK!!! */}
						{/* <div className="listing-favorite-button-background"><i className="fa-solid fa-heart"></i></div> */}
						{/* <div className="listing-favorite-button"><i className="fa-regular fa-heart"></i></div> */}
						<div className="listings-photo-container">
							{/* <img className="listings-photo" src={require(`../../images/listings/${photoFileNames[num-1]}.png`)} /> */}
							<div className="hover-overlay"></div>
							<img className="listings-photo" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} />
						</div>
						<div className="listings-text-container">
							<div className="listings-card-top-row"><p>{`${listing?.city}, ${listing?.state}`}</p> <span className="listings-index-rating">{listing.numRatings >= 3 && 
								<>
									<span className="index-star-icon"><i className="fa-solid fa-star"></i></span>
									<span className="index-rating-num">{formattedOverallRating()}</span>
								</>
							}</span></div>
							{distance ? <p>{`${distance} miles away`}</p> : <p>Calculating distance...</p>}
							{/* <p>{`${listing?.title}`}</p> */}
							<p>June 15 - 22</p>
							<div className="listings-index-price-para"><div className="listings-index-price-figure">{`$${listing?.baseNightlyRate}`}</div><div>&nbsp;night</div></div>
						</div>
			</div>
		</Link>
		</motion.div>
	)
}

const ListingsIndex = ({localLatitude, localLongitude, filter=null, isLoaded}) => {
	const dispatch = useDispatch();
	const [distancesLoaded, setDistancesLoaded] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : {})
	let filteredListings;
	if(filter) {
		filteredListings = Object.values(listings).filter(listing => listing.category === filter)
	} else {
		filteredListings = Object.values(listings)
	}

	// const [localLatitude, setLocalLatitude] = useState(null)
	// const [localLongitude, setLocalLongitude] = useState(null)
	const [distancesObj, setDistancesObj] = useState(null);
	const [distancesArray, setDistancesArray] = useState([]);
	const [destinations, setDestinations] = useState([]);

	// useEffect(() => {
	// 	navigator.geolocation.getCurrentPosition((position) => {
	// 		setLocalLatitude(position.coords.latitude)
	// 		setLocalLongitude(position.coords.longitude)
	// 		console.log("that simple?", position)
	// 	}, (err) => {}, {enableHighAccuracy: false, timeout: 20000, maximumAge: Infinity})
	// }, [])

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchListings())
	}, [])
	// }, [filter])

	// const destinations = filteredListings.map(listing => {
	// 	return {lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) } 
	// } )
	useEffect(() => {
		setDestinations(filteredListings.map(listing => {
			return {lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) } 
		} ))
	// }, [filter])
	}, filteredListings) //for some reason this works, NOT listings
	// }, listings)

	useEffect(() => {
		if(localLatitude && localLongitude && isLoaded && destinations.length){
			let service = new window.google.maps.DistanceMatrixService();
			let numTries = 1;
			const getDistance = () => {
				try {
					service.getDistanceMatrix(
						{
							origins: [{lat:parseFloat(localLatitude), lng:parseFloat(localLongitude)}],
							destinations: destinations,
							travelMode: "DRIVING",
							unitSystem: window.google.maps.UnitSystem.IMPERIAL,
							avoidHighways: false,
							avoidTolls: false
						}
					)
						.then((response) => {
							setDistancesArray(
								response.rows[0].elements.map(element => element.distance.text.split(" ")[0])
							)
							// console.log("status", status)
							console.log("response of Distance Matrix Service Obj", response)
							// console.log("response of Distance Matrix Service Obj", response.)
						})
						.catch((err) => {
							console.log("origin lat", parseFloat(localLatitude), "origin long", parseFloat(localLongitude))
							console.log("destinations", destinations)
							console.log(`inner catch distance error #${numTries++}`)
							getDistance()	
						})	
				} 
				catch (err) {
					// console.log(`outer catch distance error #${numTries++}`)
					// getDistance()
				}
			}
			getDistance();
			// service.getDistanceMatrix(
			// 	{
			// 		origins: [{lat:parseFloat(localLatitude), lng:parseFloat(localLongitude)}],
			// 		destinations: destinations,
			// 		travelMode: "DRIVING",
			// 		unitSystem: window.google.maps.UnitSystem.IMPERIAL,
			// 		avoidHighways: false,
			// 		avoidTolls: false
			// 	}
			// )
			// 	.then((response) => {
			// 		setDistancesArray(
			// 			response.rows[0].elements.map(element => element.distance.text.split(" ")[0])
			// 		)
			// 		// console.log("status", status)
			// 		console.log("response of Distance Matrix Service Obj", response)
			// 		// console.log("response of Distance Matrix Service Obj", response.)
			// 	})
			// 	.catch((err) => {
			// 		console.log("error", err)
			// 	})
			// 	,
			// 	(response, status) => {
			// 		if (status !== "OK") {
			// 			console.log("error. origin", {lat:parseFloat(localLatitude), lng:parseFloat(localLongitude)})
			// 		} else {
			// 			setDistancesArray(
			// 				response.rows[0].elements.map(element => element.distance.text.split(" ")[0])
			// 			)
			// 			console.log("status", status)
			// 			console.log("response of Distance Matrix Service Obj", response)
			// 		}
			// 	}
			// );
		}

		// DOESNT WORK IF WE ACCESS RESPONSE
		// setDistancesObj(<DistanceMatrixService
		// 	options={{
		// 		origins: [{lat:parseFloat(localLatitude), lng:parseFloat(localLongitude)}],
		// 		destinations: destinations,
		// 		travelMode: "DRIVING",
		// 	}}
		// 	callback={(response) => {
		// 		distancesArray.push(response)
		// 		console.log("response of Distance Matrix Service Obj", response?.rows[0].elements.map(element => element.distance))
		// 	}}
		// />)
	}, [localLatitude, localLongitude, destinations, isLoaded])

	const numTestListings = 13;
	const listingCards = [];

	if(filteredListings.length !== 0){
		if(!filter){
			for(let i = 1; i <= numTestListings; i++) {
				listingCards.push(
					// <ListingCard key={filteredListings[(i % filteredListings.length) - 1]?.id} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
					<ListingCard distance={distancesArray[i - 1]} filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
				)
			}
		} else {
			for(let i = 1; i <= filteredListings.length; i++) {
				listingCards.push(
					// <ListingCard key={filteredListings[(i % filteredListings.length) - 1]?.id} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
					<ListingCard distance={distancesArray[i - 1]} filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
				)
			}
		}
	}
	
	return (
		// <>
		<div className="grid-container-container" >
			<div className="grid-container">
				{/* <AnimatePresence mode="wait"> */}
				<AnimatePresence mode="popLayout">
					{listingCards}
					{/* {distances} */}
					{/* {distancesObj} */}
				</AnimatePresence>
			</div>
		</div>
		// </>
	)
}

export default ListingsIndex;