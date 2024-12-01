import "./ListingsIndex.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { Link } from "react-router-dom";
import { useState } from "react";
import {AnimatePresence, motion} from "framer-motion";
// import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { Loader } from "@googlemaps/js-api-loader";
// import { DistanceMatrixService } from "@react-google-maps/api";

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
	const [distancesArray, setDistancesArray] = useState([]);
	const [destinations, setDestinations] = useState([]);
	// const [filteredListings, setFilteredListings] = useState([]);
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : {})
	let filteredListings;
	if(filter) {
		filteredListings = Object.values(listings).filter(listing => listing.category === filter);
		// setFilteredListings(Object.values(listings).filter(listing => listing.category === filter));
	} else {
		filteredListings = Object.values(listings);
		// setFilteredListings(Object.values(listings));
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchListings())
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [filter])

	useEffect(() => {
		setDestinations(filteredListings.map(listing => {
			return {lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) } 
		} ))
	}, filteredListings) //for some reason this works, NOT listings
	// }, [filteredListings, listings])
	// }, [filteredListings])
	// }, [filter])
	// }, listings)

	useEffect(() => {
		if(localLatitude && localLongitude && isLoaded && destinations.length){
			let service = new window.google.maps.DistanceMatrixService();
			const getDistance = async () => {
				try {
					let distances = await service.getDistanceMatrix(
						{
							origins: [{lat:parseFloat(localLatitude), lng:parseFloat(localLongitude)}],
							destinations: destinations,
							travelMode: "DRIVING",
							unitSystem: window.google.maps.UnitSystem.IMPERIAL,
							avoidHighways: false,
							avoidTolls: false
						}
					)
					setDistancesArray(distances.rows[0].elements.map(element => element.distance.text.split(" ")[0]));
				} 
				catch (err) {
					console.error(err.message);
				}
			}
			getDistance();
		}
	}, [localLatitude, localLongitude, destinations, isLoaded])

	const numTestListings = 13;
	const listingCards = [];

	if(filteredListings.length !== 0){
		if(!filter){
			for(let i = 1; i <= numTestListings; i++) {
				listingCards.push(
					<ListingCard distance={distancesArray[i - 1]} filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
				)
			}
		} else {
			for(let i = 1; i <= filteredListings.length; i++) {
				listingCards.push(
					<ListingCard distance={distancesArray[i - 1]} filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
				)
			}
		}
	}
	
	return (
		<div className="grid-container-container" >
			<div className="grid-container">
				{/* <AnimatePresence mode="wait"> */}
				<AnimatePresence mode="popLayout">
					{listingCards}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default ListingsIndex;