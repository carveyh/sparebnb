import "./ListingsIndex.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ListingsIndexCard from "./ListingsIndexCard";
import ListingsIndexCardShimmer from "./ListingsIndexCardShimmer";
// import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { Loader } from "@googlemaps/js-api-loader";
// import { DistanceMatrixService } from "@react-google-maps/api";

// export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

const ListingsIndex = ({localLatLon, filter=null, isMapsAPILoaded}) => {
	const dispatch = useDispatch();
	const [distancesArray, setDistancesArray] = useState([]);
	const [isLoadingListings, setIsLoadingListings] = useState(true);
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : {})
	let filteredListings;
	if(filter) {
		filteredListings = Object.values(listings).filter(listing => listing.category === filter);
	} else {
		filteredListings = Object.values(listings);
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchListings())
			.catch((err) => {
				console.error(err.message);
			})
			.finally(() => {
				// setTimeout(() => {setIsLoadingListings(false)}, 3000); // Testing: simulate load time to preview shimmer
				setIsLoadingListings(false);
			})
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [filter])

	let destinations = filteredListings.map(listing => {
		return {lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) } 
	} );

	useEffect(() => {
		if(localLatLon && isMapsAPILoaded && destinations.length){
			let service = new window.google.maps.DistanceMatrixService();
			const getDistance = async () => {
				try {
					let distances = await service.getDistanceMatrix(
						{
							origins: [{lat:parseFloat(localLatLon[0]), lng:parseFloat(localLatLon[1])}],
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
	}, [localLatLon, listings, isMapsAPILoaded, filter])

	const numTestListings = 13;
	let listingCards = [];

	if(filteredListings.length !== 0){
		if(!filter){
			for(let i = 1; i <= numTestListings; i++) {
				listingCards.push(
					<ListingsIndexCard 
						// key={filteredListings[(i - 1 & filteredListings.length)].id}
						distance={distancesArray[i - 1]} 
						filter={filter} 
						listing={filteredListings[(i - 1) % filteredListings.length]} 
						num={i} 
					/>
				)
			}
		} else {
			for(let i = 1; i <= filteredListings.length; i++) {
				listingCards.push(
					<ListingsIndexCard 
						// key={filteredListings[(i - 1 & filteredListings.length)].id}
						distance={distancesArray[i - 1]} 
						filter={filter} 
						listing={filteredListings[(i - 1) % filteredListings.length]} 
						num={i} 
					/>
				)
			}
		}
	}

	if(isLoadingListings) listingCards = [		
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
			<ListingsIndexCardShimmer/>,
	];
	
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