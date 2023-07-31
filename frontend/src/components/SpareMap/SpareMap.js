import './SpareMap.css';

import { GoogleMap, Marker, useLoadScript, Circle } from "@react-google-maps/api";
import { useMemo } from "react";
// import "./App.css";

const SpareMap = ({center={ lat: 18.52043, lng: 73.856743 }, zoom=12}, listings) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const centerMemo = useMemo(() => (center), []);

  return (
    <div className="overall-map-container">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container-listing-show"
          center={centerMemo}
          zoom={zoom}
        >
					<Marker 
						position={center} 
						options={{
							icon:{
								url: "https://i.imgur.com/DekpBQl.png",
								scaledSize: new window.google.maps.Size(35, 35),
								anchor: new window.google.maps.Point(-0,35)
							},
						}}
					/>
					{/* <Circle
					radius={1200}
					center={center}
					onMouseOver={() => console.log('mouseover')}
					onClick={() => console.log('click')}
					onMouseOut={() => console.log('mouseout')}
					// strokeColor='transparent'
					// strokeOpacity={0}
					// strokeWeight={5}
					// fillColor='#FF0000'
					// fillOpacity={0.2}
				/> */}

				</GoogleMap>
      )}
    </div>
  );
};

export default SpareMap;




// WORKING VERSION 1 ---- START
// WORKING VERSION 1 ---- START
// WORKING VERSION 1 ---- START


// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '1120px',
//   height: '480px'
// };

// // const center = {
// //   lat: -3.745,
// //   lng: -38.523
// // };

// const SpareMap = ({center}) => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
//   });

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         defaultZoom={3}
// 				// minZoom={2}
//     		// maxZoom={16}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(SpareMap)



// WORKING VERSION 1 ---- END
// WORKING VERSION 1 ---- END
// WORKING VERSION 1 ---- END










// import "./SpareMap.css";
// import { Wrapper } from "@googlemaps/react-wrapper";
// import { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";

// export const SpareMap = ({listings, mapOptions, markerEventHandlers, mapEventHandlers, center={lat: 40.73640417392163, lng: -73.99315674240313 }, zoom=10}) => {
// 	const [map, setMap] = useState(null);
// 	const mapRef = useRef(null);
// 	const markers = useRef(null);

// 	useEffect(() => {
// 		setMap(google.maps.Map(mapRef.current, zoom, center, ...mapOptions))
// 	}, [])

// 	// useEffect(() => {
// 	// 	// marker.setMap(null) // markers that are not part of listings prop to be removed
// 	// 	listings.forEach(listing => {
// 	// 		// If no marker exists, create one with `position` pointing to a `google.maps.LatLng` 
// 	// 		// object from listing.latitude and listing.longitude
// 	// 	})
// 	// }, [])

// 	// useEffect(() => {
// 	// 	// attach event handlers from mapEventHandlers to map itself.
// 	// }, [])

// 	return(
// 		<div ref={mapRef}>
// 			Map
// 		</div>
// 	)
// }

// export const SpareMapWrapper = (props) => {
// 	return (
// 		<Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
// 			<SpareMap props={props} />
// 		</Wrapper>
// 	)
// }