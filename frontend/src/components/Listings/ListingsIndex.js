import "./ListingsIndex.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ListingsIndexCard from "./ListingsIndexCard";
// import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { Loader } from "@googlemaps/js-api-loader";
// import { DistanceMatrixService } from "@react-google-maps/api";

// export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

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
					<ListingsIndexCard distance={distancesArray[i - 1]} filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
				)
			}
		} else {
			for(let i = 1; i <= filteredListings.length; i++) {
				listingCards.push(
					<ListingsIndexCard distance={distancesArray[i - 1]} filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
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