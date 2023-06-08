import "./ListingsShowPage.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListing, fetchListings } from "../../store/listings";
import { fetchUser } from "../../store/user";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
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

const ListingsShowPage = (props) => {
	const dispatch = useDispatch();
	const { listingId } = useParams()
	const listing = useSelector(state => state.entities?.listings ? state.entities.listings[`${listingId}`] : {})
	const host = useSelector(state => state.entities?.users ? state.entities.users[`${listing?.hostId}`] : {})
	const hostIdFormatted = formatTwoDigitNumberString(host?.id);	

	useEffect(() => {
		dispatch(fetchListing(listingId));
		dispatch(fetchUser(listing?.hostId));
	}, [])

	
	if(!listing || !host) return null;

	return (
		<div className="show-page-outer-container">
			<div className="show-page-dynamic-inner-container">

				{/* HEADER - START */}
				{/* HEADER - START */}
				<div className="show-header-full-header">
					<div className="show-header-inner-header">
						<div className="show-title heading-1">
						{`${listing?.title}`}
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
				{/* HEADER - END */}
				{/* HEADER - END */}

				{/* PHOTO WALL - START */}
				{/* PHOTO WALL - START */}
				<div className="photo-wall-crown">
					<div className="photo-wall-container">
						<div className="photo-wall-halver">
							<div className="photo-wall-individual-photo-div photo-wall-big">
								<ListingsShowPhoto listingId={listingId} imageNum={1}/>
							</div>
							<div className="photo-wall-grid">
								<div className="photo-wall-individual-photo-div photo-wall-one">
									<ListingsShowPhoto listingId={listingId} imageNum={2}/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-two">
									<ListingsShowPhoto listingId={listingId} imageNum={3}/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-three">
									<ListingsShowPhoto listingId={listingId} imageNum={4}/>
								</div>
								<div className="photo-wall-individual-photo-div photo-wall-four">
									<ListingsShowPhoto listingId={listingId} imageNum={5}/>
								</div>
							</div>
						</div>
					</div>	
				</div>
				{/* PHOTO WALL - END */}
				{/* PHOTO WALL - END */}


				{/* LISTING DETAILS - START */}
				{/* LISTING DETAILS - START */}
				<div className="details-outer-container">
					<div className="details-main-container">
						{/* LEFT SIDE - START */}
						{/* LEFT SIDE - START */}
						<div className="details-left-container">
							{/* DETAILS CARD | STATS - START */}
							{/* DETAILS CARD | STATS - START */}
							<div className="details-card-stats-container">
								<div className="details-card-stats-padder">
									<div className="details-card-stats-horizontal-splitter">
										<div className="details-card-stats-text-container">
												<div className="details-card-stats-text-top heading-2">
													Entire home hosted by {`${host.firstName}`}
												</div>
												<div className="details-card-stats-text-bottom plain-text">
													{`${listing.maxGuests}`} guests · {`${listing.numBedrooms}`} bedrooms · {`${listing?.numBeds}`} beds · {`${listing?.numBaths}`} baths
												</div>
										</div>
										<div className="details-card-stats-profile-thumbnail">
											<img className="fit-photo" src={require(`../../images/profilepics/${hostIdFormatted}.png`)}/>
										</div>
									</div>
								</div>
							</div>
							{/* DETAILS CARD | STATS - END */}
							{/* DETAILS CARD | STATS - END */}
							
							{/* DETAILS CARD | HIGHLIGHTS - START */}
							{/* DETAILS CARD | HIGHLIGHTS - START */}
							<div className="details-card-higlights-container horizontal-rule-top-border">
								<div className="details-card-higlights-padder">
									Dedicated workspace
									A common area with wifi that’s well-suited for working.
									Self check-in
									Check yourself in with the lockbox.
									Free cancellation for 48 hours.
								</div>
							</div>
							{/* DETAILS CARD | HIGHLIGHTS - END */}
							{/* DETAILS CARD | HIGHLIGHTS - END */}

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
						</div>
						{/* LEFT SIDE - END */}
						{/* LEFT SIDE - END */}

						{/* RIGHT SIDE - START */}
						{/* RIGHT SIDE - START */}
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
						{/* RIGHT SIDE - END */}
						{/* RIGHT SIDE - END */}
						

					</div>
				</div>
				{/* LISTING DETAILS - END */}
				{/* LISTING DETAILS - END */}





















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