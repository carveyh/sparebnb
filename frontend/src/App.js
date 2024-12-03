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

import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./components/NotFound";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

	const loggedIn = useSelector(state => !!state.session.user);
	const location = useLocation();

  const [isMapsAPILoaded, setIsMapsAPILoaded] = useState(false);
  const [localLatLon, setLocalLatLon] = useState(null);
  const [showIndexMap, setShowIndexMap] = useState(false);
  const [filter, setFilter] = useState(null);
  const mainBodyRef = useRef(null);

  useEffect(() => {
    if(isLoaded) setIsMapsAPILoaded(true);
  }, [isLoaded])

  useEffect(() => {
    const locationRequestOptions = {
      method: "GET",
      redirect: "follow",
    }
    const locationRequestEndpoint = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEOLOCATION_API_KEY}`
    const fetchLocationWithIPGeolocation = async () => {
      try {
        const res = await fetch(locationRequestEndpoint, locationRequestOptions);
        const data = await res.json();
        setLocalLatLon([data.latitude, data.longitude]);
      }
      catch (err) {
        console.error(err.message);
      }
    };
    fetchLocationWithIPGeolocation();
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
              localLatLon={localLatLon} isMapsAPILoaded={isMapsAPILoaded} 
            />}
          </Route>
          <Route exact path="/users/:userId">
            <ProfilePage />
          </Route>
          <Route exact path="/listings/:listingId">
            <ListingsShowPage isMapsAPILoaded={isMapsAPILoaded} />
          </Route>
          <Route><NotFoundPage/></Route>
        </Switch>
        {/* </div> */}
      </div>

      {!showIndexMap && <Footer />}

    </div>
  );
}

export default App;
