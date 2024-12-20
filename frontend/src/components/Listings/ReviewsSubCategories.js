import "./ReviewsSubCategories.css"
import { useEffect } from "react";

const categories = ["Cleanliness", "Accuracy", "Communication", "Location", "Check-in", "Value"];

const SubcatContainer = ({ratings, category, isModal=false}) => {

	let score;
	switch (category) {
		case categories[0]: //"Cleanliness"
			score = ratings.cleanliness;
			break;
		case categories[1]: //"Accuracy"
			score = ratings.accuracy;
			break;
		case categories[2]: //"Communication"
			score = ratings.communication;
			break;
		case categories[3]: //"Location"
			score = ratings.location;
			break;
		case categories[4]: //"Check-in":
			score = ratings.checkin;
			break;
		case categories[5]: //"Value":
			score = ratings.value;
			break;
		default:
			break;
	}
	
	
	useEffect(() => {
		let scoreBar;
		if(isModal) {
			scoreBar = document.querySelector(`.bar-score-${category}-modal`);
		} else {
			scoreBar = document.querySelector(`.bar-score-${category}`);
		}
		scoreBar.style.width = `${score / 5 * 100}%`
	}, [])
	
	score = score.toFixed(1);

	return(
		<div className={`subcat-container ${isModal && `modal-subcat-container`}`}>
			<div className="subcat-container-inner">
				<div className="subcat-category-box">{category}</div>
				<div className="subcat-score-box">
					<div className="subcat-bar-bg">
						<div className={`subcat-bar-score bar-score-${category} ${isModal && `bar-score-${category}-modal`}`}></div>
					</div>
					<div className="subcat-rating">{score}</div>
				</div>
			</div>
		</div>
	)
}

export const ReviewsSubCategories = ({ratings, isModal=false}) => {
	const subcontainers = categories.map(category => {
		return (
			<SubcatContainer ratings={ratings} category={category} isModal={isModal} />
		)
	})
	return (
		<div className={`review-subcategories-main ${isModal && `modal-ratings`}`}>
			{subcontainers}
		</div>
	)
}