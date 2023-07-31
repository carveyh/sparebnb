import "./MapInfoCard.css";
import { Link } from "react-router-dom";
import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

export const MapInfoCard = ({listing}) => {
	return(
		<Link to={`/listings/${listing?.id}`}>
		<div className="map-info-card-container">
			<div className="map-info-title">{listing.title}</div>
			<div className="listings-photo-container">
							{/* <img className="listings-photo" src={require(`../../images/listings/${photoFileNames[num-1]}.png`)} /> */}
							<div className="hover-overlay"></div>
							<img className="listings-photo" src={require(`../../images/listings/${formatTwoDigitNumberString(listing?.id)}/01.png`)} />
						</div>
		</div>
		</Link>
	)
}