import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Testing from "./components/Testing";
import ListingsIndex from "./components/Listings";
import { TestingConceptsPage } from "./components/Testing/TestingConcepts";
import ListingsShowPage from "./components/Listings/ListingsShowPage";

function App() {
  console.log("redirected!")
  return (
    <div>
      <Navigation />

      <div id="main-body">

        <Switch>
          <Route exact path="/testing"><Testing /></Route>
          <Route exact path="/testing-concepts"><TestingConceptsPage /></Route>
          <Route exact path="/">
            {<ListingsIndex/>}
          </Route>
          <Route exact path="/show">
            <ListingsShowPage/>
          </Route>
          <Route><h1>404 - page not found.</h1></Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
