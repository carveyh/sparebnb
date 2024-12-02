import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

export default function ListingsIndexCard ({distance, listing, num, filter}) {
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
					<img className="listings-photo" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} alt={listing?.title} />
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