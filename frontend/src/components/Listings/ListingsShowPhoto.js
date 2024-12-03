import { formatTwoDigitNumberString } from "../../utils/urlFormatter";
import { useState } from "react";

export default function ListingsShowPhoto ({listingId, imageNum}) {
	let formattedListingId = formatTwoDigitNumberString(listingId);
	let formattedImageNum = formatTwoDigitNumberString(imageNum);
	const photoDirPath = require(`../../images/listings/${formattedListingId}/${formattedImageNum}.png`);
	const [isLoading, setIsLoading] = useState(true);
	
	const ImageComponent = new Image();
	ImageComponent.src = photoDirPath;
	ImageComponent.onload = () => {
		setIsLoading(false)
	}

	if(isLoading) return <div className="listings-show-photo-shimmer"></div>;

	return(
		<>
			{/* Note: Why can't I replace string in src={require(pathString)} with photoDirPath...? */}
			{/* Because here photoDirPath is a dynamic value that is unknown until runtime, 
				while require() is a CommonJS feature that works during buildtime, not runtime!
				Hence the photoDirPath will not be resolved at buildtime
			*/}
			<img 
				alt={`View #${imageNum} for listing #${listingId}`}
				className="listings-show-photo" 
				src={photoDirPath} 
			/>
		</>
	)
}