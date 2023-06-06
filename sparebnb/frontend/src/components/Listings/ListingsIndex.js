import "./ListingsIndex.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";

export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

const PlaceholderListingData = ({listing, num}) => {
	return (
		<div className={`grid-item grid-item-${num}`}>
					<div className="listing-favorite-button"><i className="fa-regular fa-heart"></i></div>
					<div className="listings-photo-container">
						<img className="listings-photo" src={require(`../../images/listings/${photoFileNames[num-1]}.png`)} />
					</div>
					<div className="listings-text-container">
						<p>{`${listing.title}`}</p>
						<p>{`${listing.city}, ${listing.state}`}</p>
						<p>June 15 - 22</p>
						<div className="listings-index-price-para"><div className="listings-index-price-figure">{`$${listing.baseNightlyRate}`}</div><div>&nbsp;night</div></div>
					</div>
		</div>
	)
}

const ListingsIndex = (props) => {
	const dispatch = useDispatch();
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : {})
	// const listings = useSelector(state => state.listings ? state.listings : {})
	useEffect(() => {
		dispatch(fetchListings())
	}, [])
	const numTestListings = 10;
	const testListingsArray = [];

	if(Object.keys(listings).length !== 0){
		for(let i = 1; i <= numTestListings; i++) {
			testListingsArray.push(
				<PlaceholderListingData listing={listings[`${i}`]} num={i} />
			)
		}
	}

	// debugger
	
	return (
		<>
		<div className="grid-container-container">
			<div className="grid-container">
				{testListingsArray}
			</div>
		</div>
		</>
	)
}

export default ListingsIndex;