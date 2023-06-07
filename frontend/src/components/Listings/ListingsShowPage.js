import "./ListingsShowPage.css";

const ListingsShowPage = () => {
	return (
		<>
			<div className="show-header-full-header">
				<div className="show-header-inner-header">
					<div className="show-title">
					Lake Tent #4 @ The Silverlaken Estate
					</div>
					<div className="show-header-details">
						<div className="show-header-stats">
							<span className="rating-review-stats">
								<span className="star-icon"><i class="fa-solid fa-star"></i></span>
								<span className="header-rating">4.93 ·</span>
								<span className="header-review-count">15 reviews</span>
							</span>
						</div>
						<div className="show-header-buttons">Share Save</div>
					</div>
				</div>
			</div>

			{/* PHOTO WALL */}
			<div className="photo-wall-padding">
				<div className="photo-wall-container">
					<div className="photo-wall-halver">
						<div className="photo-wall-item photo-wall-big"></div>
						<div className="photo-wall-grid">
							<div className="photo-wall-item photo-wall-one">ONE</div>
							<div className="photo-wall-item photo-wall-two">TWO</div>
							<div className="photo-wall-item photo-wall-three">THREE</div>
							<div className="photo-wall-item photo-wall-four">FOUR</div>

						</div>
					</div>
					
				</div>	
			</div>
		</>
	)
}

export default ListingsShowPage;