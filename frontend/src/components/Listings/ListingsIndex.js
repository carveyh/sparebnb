import "./ListingsIndex.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useHistory } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { Link } from "react-router-dom";

// export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

const ListingCard = ({listing, num}) => {
	// const history = useHistory();
	// const handleClick = e => {
	// 	e.preventDefault();
	// 	// debugger
	// 	console.log("hi")
	// 	history.push(`/listings/${num}`)
	// }



	return (
		<Link to={`/listings/${listing?.id}`}>
			<div className={`grid-item grid-item-${num}`} >
						<div className="listing-favorite-button-background"><i class="fa-solid fa-heart"></i></div>
						<div className="listing-favorite-button"><i className="fa-regular fa-heart"></i></div>
						<div className="listings-photo-container">
							{/* <img className="listings-photo" src={require(`../../images/listings/${photoFileNames[num-1]}.png`)} /> */}
							<img className="listings-photo" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} />
						</div>
						<div className="listings-text-container">
							<p>{`${listing?.title}`}</p>
							<p>{`${listing?.city}, ${listing?.state}`}</p>
							<p>June 15 - 22</p>
							<div className="listings-index-price-para"><div className="listings-index-price-figure">{`$${listing?.baseNightlyRate}`}</div><div>&nbsp;night</div></div>
						</div>
			</div>
		</Link>
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
	const listingCards = [];

	if(Object.keys(listings).length !== 0){
		for(let i = 1; i <= numTestListings; i++) {
			listingCards.push(
				<ListingCard listing={listings[`${i}`]} num={i} />
			)
		}
	}
	
	return (
		<>
		<div className="grid-container-container">
			<div className="grid-container">
				{listingCards}
				{listingCards}
				{listingCards}
				{listingCards}
				{listingCards}
				{listingCards}
			</div>
		</div>
		</>
	)
}

export default ListingsIndex;