import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Testing from "./components/Testing";
import ListingsIndex from "./components/Listings";
import { TestingConceptsPage } from "./components/Testing/TestingConcepts";
import ListingsShowPage from "./components/Listings/ListingsShowPage";
import ProfilePage from "./components/Profile";
import { useEffect } from "react";
import { useState } from "react";

import { useLoadScript } from "@react-google-maps/api";
import Footer from "./components/Footer/Footer";

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const [localLatitude, setLocalLatitude] = useState(null)
	const [localLongitude, setLocalLongitude] = useState(null)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLocalLatitude(position.coords.latitude)
			setLocalLongitude(position.coords.longitude)
			console.log("that simple?", position)
		}, (err) => {}, {enableHighAccuracy: false, timeout: 20000, maximumAge: Infinity})
	}, [])

  return (
    <div className="under-modal">
      <Navigation />

      <div id="main-body">

        <Switch>
          <Route exact path="/testing"><Testing /></Route>
          <Route exact path="/testing-concepts"><TestingConceptsPage /></Route>
          <Route exact path="/">
            {<ListingsIndex localLatitude={localLatitude} localLongitude={localLongitude} isLoaded={isLoaded} />}
          </Route>
          <Route exact path="/users/:userId">
            <ProfilePage />
          </Route>
          <Route exact path="/listings/:listingId">
            <ListingsShowPage isLoaded={isLoaded} />
          </Route>
          <Route><h1>404 - page not found.</h1></Route>
        </Switch>
      </div>

      <Footer />

    </div>
  );
}

export default App;
