import "./MapInfoCard.css";
import { Link } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

export const MapInfoCard = ({listing}) => {
	const formattedOverallRating = () => {
		const twoDigit = listing?.averageRatings.overallRating.toFixed(2)
		const oneDigit = listing?.averageRatings.overallRating.toFixed(1)
		return (twoDigit === oneDigit + '0') ? oneDigit : twoDigit;
	}

	return(
		<Link to={`/listings/${listing?.id}`}>
		<div className="map-info-card-container">
			<div className="map-info-title">{listing.title}</div>
			<div className="map-info-location">{`${listing.city}, ${listing.state}`}</div>
			<div className="map-info-pricing-rating">
				<span>{`$${listing.baseNightlyRate}`}</span>
				<span>{listing.numRatings >=3 && 
					<span className="map-rating-box">
						<span className="star-icon-index-map"><i className="fa-solid fa-star"></i></span>
						<span>{`${formattedOverallRating()}`}</span>
					</span>
				}
				</span>
			</div>
			<div className="listings-photo-container">
				<div className="hover-overlay"></div>
				<img className="listings-photo" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} />
			</div>
		</div>
		</Link>
	)
}