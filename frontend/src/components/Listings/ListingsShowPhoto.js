import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

export const ListingsShowPhoto = ({listingId, imageNum}) => {
	listingId = formatTwoDigitNumberString(listingId);
	imageNum = formatTwoDigitNumberString(imageNum);
	const photoDirPath = `../../images/listings/${listingId}/${imageNum}.png`;
	
	return(
		<>
			{/* Why can't I replace string with photoDirPath...? */}
			<img className="listings-show-photo" src={require(`../../images/listings/${listingId}/${imageNum}.png`)} />
		</>
	)
}