import "./ReviewsSubCategories.css"
import { useEffect } from "react";

const categories = ["Cleanliness", "Accuracy", "Communication", "Location", "Check-in", "Value"];

const SubcatContainer = ({ratings, category}) => {
	
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
	}
	
	
	useEffect(() => {
		const scoreBar = document.querySelector(`.bar-score-${category}`);
		scoreBar.style.width = `${score / 5 * 100}%`
	}, [])
	
	score = score.toFixed(1);

	return(
		<div className="subcat-container">
			<div className="subcat-container-inner">
				<div className="subcat-category-box">{category}</div>
				<div className="subcat-score-box">
					<div className="subcat-bar-bg">
						<div className={`subcat-bar-score bar-score-${category}`}></div>
					</div>
					<div className="subcat-rating">{score}</div>
				</div>
			</div>
		</div>
	)
}

export const ReviewsSubCategories = ({ratings}) => {
	const subcontainers = categories.map(category => {
		return (
			<SubcatContainer ratings={ratings} category={category} />
		)
	})
	return (
		<div className="review-subcategories-main">
			{subcontainers}
		</div>
	)
}

// container 
		// margin bottom 24px;

// cell 
		// margin-right 8.3333%
		// width 41.6667%
		// fontsize 16px
		// fontweight 400
		// margin bottom 16px

// category
		// width 100%

// bar & rating container
		// width 50%
		// margin left 12px
		// flex row, align items center

// bar bg
		// box sizing border box
		// margin right 4px
		// position relative
		// background color: rgb(221,221,221)
		// width 100%
		// height 4px;
		// border-radius: 2px

// bar foreground
		// width: (rating / 5)%
		// position absolute
		// top: 0px
		// left: 0px
		// bottom 0px
		// border radius 2px
		// background rgb(34,34,34)

// rating
		// color rgb(34,34,34)
		// font-weight 600
		// font size 12px
		// line-height: 16px
		// margin-left 6px
