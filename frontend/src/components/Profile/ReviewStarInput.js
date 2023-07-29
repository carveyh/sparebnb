import { useState } from "react"

export const ReviewStarInput = ({rating, setRating, formIncomplete, setFormIncomplete}) => {

	const [localRating, setLocalRating] = useState(rating);

	return(
		<>
			<div className="review-rating-box">
				<div
					className={localRating >= 1 ? `active-star` : 'inactive-star'}
					onMouseEnter={e => setLocalRating(1)}
					onMouseLeave={e => setLocalRating(rating)}
					onClick={e => setRating(1)}
				>
					<i class="fa-solid fa-star"></i>
				</div>
				<div
					className={localRating >= 2 ? `active-star` : 'inactive-star'}
					onMouseEnter={e => setLocalRating(2)}
					onMouseLeave={e => setLocalRating(rating)}
					onClick={e => setRating(2)}
				>
					<i class="fa-solid fa-star"></i>
				</div>
				<div
					className={localRating >= 3 ? `active-star` : 'inactive-star'}
					onMouseEnter={e => setLocalRating(3)}
					onMouseLeave={e => setLocalRating(rating)}
					onClick={e => setRating(3)}
				>
					<i class="fa-solid fa-star"></i>
				</div>
				<div
					className={localRating >= 4 ? `active-star` : 'inactive-star'}
					onMouseEnter={e => setLocalRating(4)}
					onMouseLeave={e => setLocalRating(rating)}
					onClick={e => setRating(4)}
				>
					<i class="fa-solid fa-star"></i>
				</div>
				<div
					className={localRating >= 5 ? `active-star` : 'inactive-star'}
					onMouseEnter={e => setLocalRating(5)}
					onMouseLeave={e => setLocalRating(rating)}
					onClick={e => setRating(5)}
				>
					<i class="fa-solid fa-star"></i>
				</div>
		</div>
		<div className="star-missing-section">
			{(formIncomplete && !rating) && <div className="form-incomplete-notice"><i className="fa-solid fa-circle-exclamation"></i> Rating required</div>}
		</div>
	</>
	)
}