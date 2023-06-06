import ListingsIndex from "./ListingsIndex";

import "./ListingsCarousel.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";

const ListingsFilter = () => {
	
	return (
		<div className="carousel-container">
			<div className="carousel-main">
				<div className="category-selector">
					<i className="fa-solid fa-water-ladder"></i>
					<span>Amazing pools</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-bed"></i>
					<span>Rooms</span>
				</div>
				<div className="category-selector">
					<i className="fa-brands fa-accessible-icon"></i>
					<span>Adapted</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-umbrella-beach"></i>
					<span>Beachfront</span>
				</div>
				<div className="category-selector">
					<i class="fa-solid fa-tower-observation"></i>
					<span>Treehouses</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-mountain-sun"></i>
					<span>Mountains</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-fire"></i>
					<span>Trending</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-landmark"></i>
					<span>Mansions</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-crown"></i>
					<span>Majestic</span>
				</div>
				<div className="category-selector">
					<i className="fa-regular fa-snowflake"></i>
					<span>Arctic</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-tree"></i>
					<span>Woods</span>
				</div>
				<div className="category-selector">
					<i className="fa-solid fa-circle-radiation"></i>
					<span>Govt secret</span>
				</div>
				<div className="category-selector">
					<i class="fa-regular fa-eye-slash"></i>
					<span>Private escapes</span>
				</div>
				<div className="category-selector">
					<i class="fa-solid fa-film"></i>
					<span>Home theater</span>
				</div>
				<div className="category-selector">
					<i class="fa-solid fa-palette"></i>
					<span>Studios</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-gamepad"></i>
					<span>Gaming dens</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-dumbbell"></i>
					<span>Fitness</span>
				</div>
				<div className="category-selector">
				<i class="fa-regular fa-gem"></i>
					<span>Crème de la crème</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-leaf"></i>
					<span>Green</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-stroopwafel"></i>
					<span>Rustic</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-hashtag"></i>
					<span>Urban</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-tornado"></i>
					<span>Tornado</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-tent"></i>
					<span>Camps</span>
				</div>
				<div className="category-selector">
				<i class="fa-solid fa-cannabis"></i>
					<span>420 friendly</span>
				</div>
			</div>
		</div>
	)
}

const ListingsMain = () => {
	const sessionUser = useSelector(state => state.session?.user )
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchListings())
	}, [])
	
	const listings = useSelector(state => state.entities?.listings)
	return (
		<>
			<ListingsFilter/>
			<ListingsIndex />
			<div className="listings-main">
          {/* <img src={sessionUser.photoUrl} />   */}
			</div>
		</>
	)
}

export default ListingsMain;