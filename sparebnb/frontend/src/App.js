// import LoginFormPage from "./components/LoginFormModal/LoginForm";
import { Route, Link, NavLink, Switch, useHistory } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal/SignupForm";
import Navigation from "./components/Navigation";
import { useSelector } from "react-redux";
import Testing from "./components/Testing";
import ListingsIndex from "./components/Listings/ListingsIndex";

function App() {
  // const history = useHistory();

  const sessionUser = useSelector(state => state.session?.user )
  const loremIpsumWall = []
  const LoremIpsum = ({className}) => {
    return(
      <p className={className} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  )}
  for(let i = 0; i < 15; i++){
    loremIpsumWall.push(<LoremIpsum/>);
  }

  return (
    <div>
      <Navigation />

      <div id="main-body">
        {sessionUser &&
          <img src={sessionUser.photoUrl} />  
        }
        <Switch>
          <Route exact path="/testing"><Testing /></Route>
          {/* <Route exact path="/">{loremIpsumWall}</Route> */}
          <Route exact path="/">
            {<ListingsIndex/>}
            {/* {loremIpsumWall}
            {loremIpsumWall}
            {loremIpsumWall} */}
          </Route>
          <Route><h1>404 - page not found.</h1></Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
