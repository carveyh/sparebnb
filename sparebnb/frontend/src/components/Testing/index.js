import "./Testing.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { useState } from "react";


const words = "apple banana cherry";
const array = words.split(" ");

export const photoFileNames = "architectural-wonder beach-niantic dining-jersey fossatun-iceland hilltop-haven mirror-glass-cabin mountain-retreat sample-pool-listing tower-def-treehouse unique-treehouse".split(" ");

const PlaceholderListingData = ({listing, num}) => {
	// debugger
	return (
		<div className={`grid-item grid-item-${num}`}>
					<div className="listing-favorite-button"><i className="fa-regular fa-heart"></i></div>
					<div className="listings-photo-container">
						{/* <img className="listings-photo" src={require(`../../images/listings/${photoFileNames[num-1]}.png`)} /> */}
					</div>
					{/* <p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
					</p> */}
					{/* <p>{`${listing.city}, ${listing.state}`}</p>
					<p>On Lake Waterwharf</p> */}
					<div className="listings-text-container">
						<p>{`${listing.title}`}</p>
						<p>{`${listing.city}, ${listing.state}`}</p>
						<p>June 15 - 22</p>
						<p className="listings-index-price-para"><div className="listings-index-price-figure">{`$${listing.baseNightlyRate}`}</div><div>&nbsp;night</div></p>
					</div>
		</div>
	)
}

const Testing = (props) => {
	const dispatch = useDispatch();
	const listings = useSelector(state => state.entities?.listings ? state.entities.listings : null)
	// const [listingsArray, setListingsArray] = useState(listings);
	useEffect(() => {
		dispatch(fetchListings())
	}, [])

	// useEffect(() => {
	// 	setListingsArray(Object.values(listings))
	// }, [listings])
	// debugger
	const numTestListings = 10;
	const testListingsArray = [];
	// debugger

	// THIS WAS GIVING ERROR - IN CHECKING IF EMPTY OBJECT. MEMORY CHECK EQUALITY?
	// if(listings !== {}){
	if(Object.keys(listings).length !== 0){
		// debugger
		for(let i = 1; i <= numTestListings; i++) {
			testListingsArray.push(
				<PlaceholderListingData listing={listings[`${i}`]} num={i} />
				// <PlaceholderListingData listing={listingsArray[i]} num={i} />
			)
		}
	}

	return (
		<>
		<div className="grid-container-container">
			<div className="grid-container">
				{testListingsArray}
				{/* <div className="grid-item grid-item-1">
					<PlaceholderListingData />
				</div>
				<div className="grid-item grid-item-2">
					<PlaceholderListingData />
				</div>
				<div className="grid-item grid-item-3"></div>
				<div className="grid-item grid-item-4"></div>
				<div className="grid-item grid-item-5"></div>
				<div className="grid-item grid-item-6"></div>
				<div className="grid-item grid-item-7"></div>
				<div className="grid-item grid-item-8"></div>
				<div className="grid-item grid-item-9"></div>
				<div className="grid-item grid-item-10"></div>
				<div className="grid-item grid-item-11"></div>
				<div className="grid-item grid-item-12"></div>
				<div className="grid-item grid-item-13"></div>
				<div className="grid-item grid-item-14"></div>
				<div className="grid-item grid-item-15"></div>
				<div className="grid-item grid-item-16"></div> */}
			</div>
		</div>
		</>
	)
}










// const Testing = (props) => {
// 	return (
// 		<>
// 			<div className="main-test-div" >
// 				<div className="fake-header">
// 					Hello from testing!
// 				</div>
// 				<br />
// 				<p>
// 					This para. Default font-size is 16. 
// 					<ul>
// 						<li>`font-size: #rem` makes a factor of root's font-size.</li>
// 						<li>`font-size: #em` makes a factor of container's font-size.</li>
// 					</ul>
// 				</p>

// 				<div className="ani-parent">
// 					<div className="ani-child"></div>
// 				</div>


// 			</div>
// 		</>
// 	)
// }

export default Testing;

// rem & em: https://www.sitepoint.com/understanding-and-using-rem-units-in-css/#:~:text=In%20CSS%20rem%20stands%20for,and%20spacing%20throughout%20your%20UI.
	// rem Relative to document root element, em relative to parent of target element.
// Devtools advanced usage https://www.youtube.com/watch?v=151NXMk0a2c
// Devtools CSS Flexbox visualizer https://developer.chrome.com/docs/devtools/css/flexbox/#layout
// Flexbox: https://www.youtube.com/watch?v=1zKX71GYisE
	//////////////// 
	// DEFAULT:
	//////////////// 
		// flex-shrink: 1 - SHRINK to be as small as needed to fit within container. 0 means don't shrink, will expand out of container
		// flex-grow: 0 - DON'T GROW.
		// flex-basis: auto - Sets flex-basis to ELEMENT'S NORMAL WIDTH.
	////////////////
	// flex: 1;
	////////////////
		// flex-shrink: 0 - DO NOT LET SHRINK
		// flex-grow: 1 - GROW to take unused space of container.
		// flex-basis: 0 - Sets flex-basis to 0px
	////////////////
	// flex: 1 1;
	////////////////
		// flex-shrink: 1 - SHRINK to be as small as needed to fit within container.
		// flex-grow: 1 - GROW to take unused space of container.
		// flex-basis: 0 - Sets flex-basis to 0px
	////////////////
	// flex: 1 1 50px;
	////////////////
		// flex-shrink: 1
		// flex-grow: 1
		// flex-basis: 50px; - Sets flex basis to 50px, add or subtract any space for shrink/grow starting from basis
	////////////////
	// flex-wrap: wrap
	// align-content: center / flex-end / space-between / etc
	////////////////
		// These two allows for items to wrap around on new rows in a flex container;
		// align-content (not align-items) specifies spacing btwn rows!
	////////////////
	// .box:nth-child(2)
	// .box:last-child
	////////////////
		// Selects the 2nd/last .box element
	////////////////
	// flex-wrap: wrap
	// gap: 2rem
	////////////////
		// Ensures a 2rem gap btwn flex elements, both btwn horizontal elements,
		// and vertical elements (if flex-wrap: wrap)
	////////////////
	// flex-basis: 100px; (default auto)
	////////////////
		// By default, flex-basis is auto so it is the element width.
		// If width defined, it will be ignored in favor of a flex-basis in below situations:
		// flex-grow: (default 0)
			// Any items within display:flex with flex-grow > 0, will take any
			// remaining space in container, divide proportionally to each item's
			// flex-grow amt, and add that amt to its flex-basis for its actual width.
		// To make all elements same size:
			// flex-basis: 0
			// flex-grow: same for all elements
		// flex-shrink: (default 1)
			// Similar behavior - except flex-shrink will only shrink width of an element
			// to its min width needed to still display its content, and then shrink the rest
			// of flex container's elements accordingly.
	////////////////
	// AUTO MARGINS!
	////////////////
		// margin-left: auto
			// This will cause any remaining space to be put in the margin of the specified element
			// If you do margin-right/left for multiple items within a flex container,
			// Will split the margins evenly among them.
	////////////////
	// flex-flow
	////////////////
		// Combines flex-direction & flex-wrap
			// Default: row nowrap
			// Switch up order: column wrap-reverse
	////////////////
	// Display basics
	////////////////
		// display: block
			// Takes up entire width of container, forcing other elements on newline above and below its content
		// display: inline (e.g. span)
			// Takes up minimal space possible, inline elements fit as closely as possible
			// cannot take width / height
		// display: inline-block
			// can set width and height, but behaves like inline in document flow
		// display: none
			// as if element does not exist, does not take up space in document flow.
	////////////////
	// Variables
	////////////////
		// Cascade down and can be inherited by descendant elements
			// :root {
			//  	--div-background-color: red;
			// }
			// 
			// .child {
			//	background-color: var(--div-background-color); 
			// 	color: var(--div-background-color, pink) (can specify a default value if css variable not found)
			// }
			// 
			// .one {
			//	--div-background-color: blue (can override an applied variable on select elements) 
			// }
		// Manipulate with JS:
			// READ
			// window.getComputedStyle(document.documentElement).getPropertyValue('--div-background-color')
			// WRITE
			// In click handler: document.documentElement.style.setProperty('--div-background-color', '#333')
	////////////////
	// FORM ELEMENT STYLING:
	////////////////
		// FORM ELEMENTS DO NOT INHERIT FONT SETTINGS!!! https://stackoverflow.com/questions/26140050/why-is-font-family-not-inherited-in-button-tags-automatically
	////////////////
	// CSS ANIMATIONS
	////////////////
		// transition (simple)
		// animation (complex)