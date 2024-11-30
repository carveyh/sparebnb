import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Testing from "./components/Testing";
import ListingsMain from "./components/Listings";
import { TestingConceptsPage } from "./components/Testing/TestingConcepts";
import ListingsShowPage from "./components/Listings/ListingsShowPage";
import ProfilePage from "./components/Profile";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from "react";

import { useLoadScript } from "@react-google-maps/api";
import Footer from "./components/Footer/Footer";

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

	const loggedIn = useSelector(state => !!state.session.user);
	const location = useLocation();

  const [localLatitude, setLocalLatitude] = useState(null)
	const [localLongitude, setLocalLongitude] = useState(null)
  const [showIndexMap, setShowIndexMap] = useState(false);
  const [filter, setFilter] = useState(null);
  const mainBodyRef = useRef(null);

	useEffect(() => {
    const fetchLocationWithIPAPI = async () => {
      let endpoint = `http://ip-api.com/json`;
      try {
        const res = await fetch(endpoint);
        // const data = await res.json();
        // console.log("ip-api success", data, "lat", data.lat, "lon", data.lon, "zip", data.zip);
        // console.log("ip-api usage limiting", res.headers.entries)
        for(const [key, value] of res.headers.entries()) {
          console.log(`${key}: ${value}`);
        }
        const data = await res.json();
        console.log("ip-api success", data, "lat", data.lat, "lon", data.lon, "zip", data.zip);
        setLocalLatitude(data.lat)
        setLocalLongitude(data.lon)
      }
      catch (err) {
        console.err(err.message, err);
      }
    };
    fetchLocationWithIPAPI();
    // // Previous way: using window.navigator interface, this prompted user to consent '<site> wants to Know your location: Allow this time / Allow on every visit / Don't allow'
    // // new way less friction without needing to prompt user
		// navigator.geolocation.getCurrentPosition((position) => {
		// 	setLocalLatitude(position.coords.latitude)
		// 	setLocalLongitude(position.coords.longitude)
		// 	console.log("that simple?", position, "lat", position.coords.latitude, "lon", position.coords.longitude, "zip", position.coords.zip)
		// }, (err) => {}, {enableHighAccuracy: false, timeout: 20000, maximumAge: Infinity})
	}, [])

  // Dynamically anchor footer to bottom of viewport if page height is less than viewport:
  useEffect(() => {
		const navBarHeight = document.querySelector(".upper-navbar-header")?.offsetHeight;
		const footerHeight = document.querySelector(".footer-container")?.offsetHeight;
		const topBotHeight = navBarHeight + (footerHeight || 0)
    if(mainBodyRef.current){
      mainBodyRef.current.style.minHeight = `calc(100vh - ${topBotHeight}px)`
    }	
	}, [loggedIn, location.pathname, filter])

  return (
    <div className="under-modal">
      <Navigation filter={filter} setFilter={setFilter} />

      <div ref={mainBodyRef} id="main-body">
      {/* <div id="main-body"> */}
        {/* <div ref={mainBodyRef} id="main-body-inner"> */}
        {/* <div id="main-body-inner"> */}

        <Switch>
          <Route exact path="/testing"><Testing /></Route>
          <Route exact path="/testing-concepts"><TestingConceptsPage /></Route>
          <Route exact path="/">
            {<ListingsMain 
              filter={filter} setFilter={setFilter}
              showIndexMap={showIndexMap} setShowIndexMap={setShowIndexMap}
              localLatitude={localLatitude} localLongitude={localLongitude} isLoaded={isLoaded} 
            />}
          </Route>
          <Route exact path="/users/:userId">
            <ProfilePage />
          </Route>
          <Route exact path="/listings/:listingId">
            <ListingsShowPage isLoaded={isLoaded} />
          </Route>
          <Route><h1>404 - page not found.</h1></Route>
        </Switch>
        {/* </div> */}
      </div>

      {!showIndexMap && <Footer />}

    </div>
  );
}

export default App;
