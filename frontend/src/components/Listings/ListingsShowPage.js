import "./ListingsShowPage.css";

export const ListingsShowPhoto = (folderNum, imageNum) => {
	return(
		<>
			<img className="listings-show-photo" src={require(`../../images/listings/02/01.png`)} />

		</>
		
	)
}

const ListingsShowPage = () => {
	const photoDirPath = "";
	
	return (
		<div className="show-page-outer-container">
			<div className="show-page-dynamic-inner-container">
				{/* HEADER START */}
				{/* HEADER START */}
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
				{/* HEADER END */}
				{/* HEADER END */}

				{/* PHOTO WALL START */}
				{/* PHOTO WALL START */}
				<div className="photo-wall-crown">
					<div className="photo-wall-container">
						<div className="photo-wall-halver">
							<div className="photo-wall-photo-container photo-wall-big"><ListingsShowPhoto/></div>
							<div className="photo-wall-grid">
								<div className="photo-wall-photo-container photo-wall-one">
									ONE
								</div>
								<div className="photo-wall-photo-container photo-wall-two">
									TWO
								</div>
								<div className="photo-wall-photo-container photo-wall-three">
									THREE
								</div>
								<div className="photo-wall-photo-container photo-wall-four">
									FOUR
								</div>

							</div>
						</div>
						
					</div>	
				</div>
				{/* PHOTO WALL END */}
				{/* PHOTO WALL END */}
				<br/>
				<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
				<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
				<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
				<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
				<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>







			</div>
		</div>
	)
}

export default ListingsShowPage;