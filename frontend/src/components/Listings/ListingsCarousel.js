export default function ListingsCarousel ({filter, setFilter}) {
	
	return (
		<div className="carousel-container">
			<div className="carousel-main">
				<div className={`category-selector ${filter === "amazing-pools" && `selected-category`}`} onClick={e => setFilter("amazing-pools")}>
					<i className="fa-solid fa-water-ladder"></i>
					<span>Amazing pools</span>
				</div>
				<div className={`category-selector ${filter === "rooms" && `selected-category`}`} onClick={e => setFilter("rooms")}>
					<i className="fa-solid fa-bed"></i>
					<span>Rooms</span>
				</div>
				<div className={`category-selector ${filter === "beachfronts" && `selected-category`}`} onClick={e => setFilter("beachfronts")}>
					<i className="fa-solid fa-umbrella-beach"></i>
					<span>Beachfront</span>
				</div>
				<div className={`category-selector ${filter === "treehouses" && `selected-category`}`} onClick={e => setFilter("treehouses")}>
					<i className="fa-solid fa-tower-observation"></i>
					<span>Treehouses</span>
				</div>
				<div className={`category-selector ${filter === "adapted" && `selected-category`}`} onClick={e => setFilter("adapted")}>
					<i className="fa-brands fa-accessible-icon"></i>
					<span>Adapted</span>
				</div>
				<div className={`category-selector ${filter === "mountains" && `selected-category`}`} onClick={e => setFilter("mountains")}>
					<i className="fa-solid fa-mountain-sun"></i>
					<span>Mountains</span>
				</div>
				<div className={`category-selector ${filter === "trending" && `selected-category`}`} onClick={e => setFilter("trending")}>
					<i className="fa-solid fa-fire"></i>
					<span>Trending</span>
				</div>
				<div className={`category-selector ${filter === "mansions" && `selected-category`}`} onClick={e => setFilter("mansions")}>
					<i className="fa-solid fa-landmark"></i>
					<span>Mansions</span>
				</div>
				<div className={`category-selector ${filter === "majestic" && `selected-category`}`} onClick={e => setFilter("majestic")}>
					<i className="fa-solid fa-crown"></i>
					<span>Majestic</span>
				</div>
				<div className={`category-selector ${filter === "arctic" && `selected-category`}`} onClick={e => setFilter("arctic")}>
					<i className="fa-regular fa-snowflake"></i>
					<span>Arctic</span>
				</div>
				<div className={`category-selector ${filter === "woods" && `selected-category`}`} onClick={e => setFilter("woods")}>
					<i className="fa-solid fa-tree"></i>
					<span>Woods</span>
				</div>
				<div className={`category-selector ${filter === "govtsecret" && `selected-category`}`} onClick={e => setFilter("govtsecret")}>
					<i className="fa-solid fa-circle-radiation"></i>
					<span>Govt secret</span>
				</div>
				<div className={`category-selector ${filter === "private" && `selected-category`}`} onClick={e => setFilter("private")}>
					<i className="fa-regular fa-eye-slash"></i>
					<span>Private escapes</span>
				</div>
				<div className={`category-selector ${filter === "theater" && `selected-category`}`} onClick={e => setFilter("theater")}>
					<i className="fa-solid fa-film"></i>
					<span>Home theater</span>
				</div>
				<div className={`category-selector ${filter === "studios" && `selected-category`}`} onClick={e => setFilter("studios")}>
					<i className="fa-solid fa-palette"></i>
					<span>Studios</span>
				</div>
				<div className={`category-selector ${filter === "gaming" && `selected-category`}`} onClick={e => setFilter("gaming")}>
					<i className="fa-solid fa-gamepad"></i>
					<span>Gaming dens</span>
				</div>
				<div className={`category-selector ${filter === "fitness" && `selected-category`}`} onClick={e => setFilter("fitness")}>
					<i className="fa-solid fa-dumbbell"></i>
					<span>Fitness</span>
				</div>
				<div className={`category-selector ${filter === "creme" && `selected-category`}`} onClick={e => setFilter("creme")}>
					<i className="fa-regular fa-gem"></i>
					<span>Crème de la crème</span>
				</div>
				{/* <div className={`category-selector ${filter === "green" && `selected-category`}`} onClick={e => setFilter("green")}>
					<i className="fa-solid fa-leaf"></i>
					<span>Green</span>
				</div>
				<div className={`category-selector ${filter === "rustic" && `selected-category`}`} onClick={e => setFilter("rustic")}>
					<i className="fa-solid fa-stroopwafel"></i>
					<span>Rustic</span>
				</div>
				<div className={`category-selector ${filter === "urban" && `selected-category`}`} onClick={e => setFilter("urban")}>
					<i className="fa-solid fa-hashtag"></i>
					<span>Urban</span>
				</div>
				<div className={`category-selector ${filter === "tornado" && `selected-category`}`} onClick={e => setFilter("tornado")}>
					<i className="fa-solid fa-tornado"></i>
					<span>Tornado</span>
				</div>
				<div className={`category-selector ${filter === "camps" && `selected-category`}`} onClick={e => setFilter("camps")}>
					<i className="fa-solid fa-tent"></i>
					<span>Camps</span>
				</div>
				<div className={`category-selector ${filter === "420" && `selected-category`}`} onClick={e => s ${filter === "" & `selected-category`}`tFilter("420")}>
					<i className="fa-solid fa-cannabis"></i>
					<span>420 friendly</span>
				</div> */}
			</div>
		</div>
	)
}