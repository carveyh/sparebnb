import "./ListingsIndex.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useHistory } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { Link } from "react-router-dom";

import {AnimatePresence, motion} from "framer-motion";

// export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

const ListingCard = ({listing, num, filter}) => {

	return (
		<motion.div key={num.toString() + filter} initial={{opacity:0.0}} animate={{opacity:1, transition:{delay:(num) * 0.035, duration: 0.2, ease:'easeIn'} }} exit={{opacity: 0}}>
		<Link to={`/listings/${listing?.id}`}>
			<div className={`grid-item grid-item-${num}`} >
						<div className="listing-favorite-button-background"><i className="fa-solid fa-heart"></i></div>
						<div className="listing-favorite-button"><i className="fa-regular fa-heart"></i></div>
						<div className="listings-photo-container">
							{/* <img className="listings-photo" src={require(`../../images/listings/${photoFileNames[num-1]}.png`)} /> */}
							<div className="hover-overlay"></div>
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
		</motion.div>
	)
}

const ListingsIndex = ({filter}) => {
	const dispatch = useDispatch();
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : {})
	let filteredListings;
	if(filter) {
		filteredListings = Object.values(listings).filter(listing => listing.category === filter)
	} else {
		filteredListings = Object.values(listings)
	}

	// const sortedListings = 
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchListings())
	}, [filter])
	const numTestListings = 13;
	const listingCards = [];

	if(filteredListings.length !== 0){
		if(!filter){
			for(let i = 1; i <= numTestListings; i++) {
				listingCards.push(
					// <ListingCard key={filteredListings[(i % filteredListings.length) - 1]?.id} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
					<ListingCard filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
				)
			}
		} else {
			for(let i = 1; i <= filteredListings.length; i++) {
				listingCards.push(
					// <ListingCard key={filteredListings[(i % filteredListings.length) - 1]?.id} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
					<ListingCard filter={filter} listing={filteredListings[(i - 1) % filteredListings.length]} num={i} />
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
				</AnimatePresence>
			</div>
		</div>
		// </>
	)
}

export default ListingsIndex;