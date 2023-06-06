import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Testing from "./components/Testing";
import ListingsIndex from "./components/Listings";

function App() {

  return (
    <div>
      <Navigation />

      <div id="main-body">

        <Switch>
          <Route exact path="/testing"><Testing /></Route>
          <Route exact path="/">
            {<ListingsIndex/>}
          </Route>
          <Route><h1>404 - page not found.</h1></Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
