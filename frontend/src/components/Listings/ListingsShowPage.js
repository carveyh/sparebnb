import "./ListingsShowPage.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useHistory } from "react-router-dom";

export const ListingsShowPhoto = (folderNum, imageNum) => {
	return(
		<>
			<img className="listings-show-photo" src={require(`../../images/listings/02/01.png`)} />
		</>
	)
}

const ListingsShowPage = () => {
	const photoDirPath = "";



	console.log("redirected!")
	
	return (
		<div className="show-page-outer-container">
			<div className="show-page-dynamic-inner-container">
				{/* HEADER START */}
				{/* HEADER START */}
				<div className="show-header-full-header">
					<div className="show-header-inner-header">
						<div className="show-title heading-1">
						Lake Tent #4 @ The Silverlaken Estate
						</div>
						<div className="show-header-details">
							<div className="show-header-stats">
								<span className="rating-review-stats stats-text-small">
									<span className="star-icon"><i class="fa-solid fa-star"></i></span>
									<span className="header-rating">4.93 ·</span>
									<span className="header-review-count">15 reviews</span>
								</span>
							</div>
							<div className="show-header-buttons stats-text-small">
								<i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;Share 
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<i class="fa-regular fa-heart"></i>&nbsp;&nbsp;Save
							</div>
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
							<div className="photo-wall-individual-photo-div photo-wall-big"><ListingsShowPhoto/></div>
							<div className="photo-wall-grid">
								<div className="photo-wall-individual-photo-div photo-wall-one">
									<ListingsShowPhoto/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-two">
									<ListingsShowPhoto/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-three">
									<ListingsShowPhoto/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-four">
									<ListingsShowPhoto/>
								</div>

							</div>
						</div>
						
					</div>	
				</div>
				{/* PHOTO WALL END */}
				{/* PHOTO WALL END */}


























				{/* LISTING DETAILS START */}
				{/* LISTING DETAILS START */}

				<div className="details-outer-container">
					<div className="details-main-container">
						<div className="details-left-container">
							<div className="details-stats-card-container">
								<div className="details-stats-card-padder">
									<div className="details-stats-card-horizontal-splitter">
										<div className="details-stats-card-text-container">
												<div className="details-stats-card-text-top heading-2">
													Entire home hosted by Garret
												</div>
												<div className="details-stats-card-text-bottom plain-text">
													10 guests · 5 bedrooms · 6 beds · 3.5 baths
												</div>
										</div>
										<div className="details-stats-card-profile-thumbnail">Prof pic</div>
									</div>
								</div>
								<div className="details-stats-card-padder horizontal-rule-top-border">
									Sup
								</div>
							</div>









							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>


							
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
							
						</div>









						<div className="details-right-container">
							<div className="floating-form-container">
								<div className="floating-form-inner-container">

								Yoollo.
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
								</div>
							</div>
						</div>
						{/* <div className="floating-reservation-box-endpoint"></div> */}

						

					</div>
					{/* <div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div> */}
				</div>
				
				
				{/* <div>
					<div className="floating-form-container">
						Yoollo.
					</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
					<div>afawei aowefjaowijefaowief oawjiefawojiefjiwae aowefjaowiefijawj e</div>
				</div>

				<div className="details-outer-container">
						<div className="details-main-container">
						
						</div>
				</div> */}

				{/* LISTING DETAILS END */}
				{/* LISTING DETAILS END */}





















				<br/>
				<div className="horizontal-rule-top-border">
					<br/>
					<div>Reviews</div>
					<br/>
				</div>
				<div className="horizontal-rule-top-border">
					<br/>
					<div>Maps</div>
					<br/>
				</div>
				<div className="horizontal-rule-top-border">
					<br/>
					<div>Just to scroll</div>
					<br/>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
					<br/>
				</div>
			</div>
		</div>
	)
}

export default ListingsShowPage;