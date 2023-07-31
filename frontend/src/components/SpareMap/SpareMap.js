import './SpareMap.css';

import { GoogleMap, Marker, useLoadScript, Circle } from "@react-google-maps/api";
import { useMemo } from "react";

const SpareMap = ({center={ lat: 18.52043, lng: 73.856743 }, zoom=12, listings}) => {
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
          mapContainerClassName={listings ? "map-container-listings-index" : "map-container-listing-show"}
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