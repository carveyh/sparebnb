import './SpareMap.css';

import { GoogleMap, Marker, useLoadScript, InfoWindow, Circle } from "@react-google-maps/api";
import { useMemo } from "react";
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { MapInfoCard } from './MapInfoCard';

// const SpareMap = ({isLoaded, center={ lat: 40.77413645301188, lng: -73.97082471226298 }, zoom=14, listings}) => {
const SpareMap = ({center={ lat: 40.77413645301188, lng: -73.97082471226298 }, zoom=14, listings}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const centerMemo = useMemo(() => (center), []);
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

	const googleMapRef = useRef(null);

	const listingsMarkers = [];
	let spareIcon;

	if(isLoaded) {
		spareIcon = {
			url: "https://i.imgur.com/DekpBQl.png",
			// scaledSize: new window.google.maps.Size(35, 35),
			scaledSize: (listings ? new window.google.maps.Size(35, 35) : new window.google.maps.Size(50, 50)),
			anchor: (listings? new window.google.maps.Point(-0,35) : new window.google.maps.Point(-0,50) ),
			// anchor: new window.google.maps.Point(-0,70)
			// anchor: new window.google.maps.Point(17.5,17.5)
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

	const circleOptions = {
		strokeColor: "#FF0000",
    strokeOpacity: 0,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.4,
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

	let newCenter;
	if(listings?.length === 1){
		newCenter={lat: parseFloat(listings[0].latitude), lng: parseFloat(listings[0].longitude) }
	}

	const onLoad = (map) => {
		
		if(listings?.length > 1){
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
		setMapRef(map);
	}

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

	const customFitBounds = () => {
		if(listings?.length > 1){
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
			// googleMapRef.current?.fitBounds(bounds);
			mapRef?.fitBounds(bounds);
		}
		if(listings?.length === 1){
			newCenter={lat: parseFloat(listings[0].latitude), lng: parseFloat(listings[0].longitude) }
		}
	}

	useEffect(() => {
		customFitBounds();
	}, [listings])

  return (
    <div className="overall-map-container">
      {!isLoaded ? (
        <></>
      ) : (
        <GoogleMap
          mapContainerClassName={listings ? "map-container-listings-index" : "map-container-listing-show"}
          center={listings?.length === 1 ? newCenter : centerMemo}
          zoom={zoom}
					onLoad={onLoad}
					// ref={googleMapRef}
					// ref={(ref) => { this.map = ref; }}
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
							<Circle center={center} radius={250} options={circleOptions} />
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