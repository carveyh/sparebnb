import ListingsIndex from "./ListingsIndex";

import "./ListingsCarousel.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import SpareMap from "../SpareMap/SpareMap";
import ListingsCarousel from "./ListingsCarousel";

const ListingsMain = ({filter, setFilter, showIndexMap, setShowIndexMap, localLatLon, isMapsAPILoaded}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchListings())
	}, [])
	
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : {})
	let filteredListings;
	if(filter) {
		filteredListings = Object.values(listings).filter(listing => listing.category === filter)
	} else {
		filteredListings = Object.values(listings)
	}

	return (
		<>
			<ListingsCarousel filter={filter} setFilter={setFilter}/>
			{showIndexMap ? 
				<SpareMap isMapsAPILoaded={isMapsAPILoaded} listings={filteredListings} />
			:
				<ListingsIndex localLatLon={localLatLon} isMapsAPILoaded={isMapsAPILoaded} filter={filter} />
			}
			<div className="index-map-toggle-container-outer">
				<div onClick={e => setShowIndexMap(old => !old)} className="index-map-toggle-container"><span>{showIndexMap ? "Show list" : "Show map"}</span><span>&nbsp;&nbsp;<i className={`fa-solid ${showIndexMap ? `fa-list-ul` : `fa-map` }`}></i></span></div>
			</div>
		</>
	)
}

export default ListingsMain;