import './SpareMap.css';

import { GoogleMap, Marker, useLoadScript, InfoWindow, Circle } from "@react-google-maps/api";
import { useMemo } from "react";
import { useState } from 'react';
import { MapInfoCard } from './MapInfoCard';

const SpareMap = ({center={ lat: 40.75293464767648, lng: -73.97873537480417 }, zoom=12, listings}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const centerMemo = useMemo(() => (center), []);
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

	const listingsMarkers = [];
	let spareIcon;
	if(isLoaded) {
		spareIcon = {
			url: "https://i.imgur.com/DekpBQl.png",
			scaledSize: new window.google.maps.Size(35, 35),
			anchor: new window.google.maps.Point(-0,35)
		}
		// // If listings index, set the boundaries of the map accordingly and add markers.
		// if(listings){
		// 	listings.forEach((listing, idx) => {
		// 		listingsMarkers.push(
		// 			<Marker 
		// 				key={idx}
		// 				position={{lat: listing.latitude, lng: listing.longitude}} 
		// 				options={{
		// 					icon:spareIcon,
		// 				}}
		// 			/>	
		// 		)
		// 	})
		// }
	}

			// If listings index, set the boundaries of the map accordingly and add markers.
			if(listings){
				listings.forEach((listing, idx) => {
					listingsMarkers.push(
						<Marker 
							key={idx}
							position={{lat: listing.latitude, lng: listing.longitude}} 
							options={{
								icon:spareIcon,
							}}
						/>	
					)
				})
			}

	const onLoad = (map) => {
		setMapRef(map);
		if(listings){
			const bounds = new window.google.maps.LatLngBounds();
			// listings?.forEach(({ latitude, longitude }) => {
			listings?.forEach((listing, idx) => {
				bounds.extend({ lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) })
				listingsMarkers.push(
					<Marker 
						key={idx}
						position={{lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude)}} 
						options={{
							icon:spareIcon,
						}}
					/>	
				)
			});
			map.fitBounds(bounds);
		}
	}

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div className="overall-map-container">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={listings ? "map-container-listings-index" : "map-container-listing-show"}
          center={centerMemo}
          zoom={zoom}
					onLoad={onLoad}
        >
					{listings ? 
						<>
							{/* {listingsMarkers} */}


							{listings.map((listing, ind) => (
								<Marker
									className="map-marker"
									key={ind}
									position={{ lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) }}
									onClick={() => {
										handleMarkerClick(ind, parseFloat(listing.latitude), parseFloat(listing.longitude), listing.address);
									}}
									options={{
										icon:spareIcon,
									}}
								>
									{isOpen && infoWindowData?.id === ind && (
										<div className='info-container'>
										<InfoWindow
											onCloseClick={() => {
												setIsOpen(false);
											}}
											position={{ lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) }}
										>
											<MapInfoCard listing={listing}/>
											{/* <h3>{infoWindowData.address}</h3> */}
										</InfoWindow>
										
										</div>
									)}
								</Marker>
          ))}





						</>
						: 
						<>
							<Marker 
								position={center} 
								options={{
									icon:spareIcon,
								}}
							/>	
						</>
					}
					
				</GoogleMap>
      )}
    </div>
  );
};

export default SpareMap;

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
					/>
					*/}