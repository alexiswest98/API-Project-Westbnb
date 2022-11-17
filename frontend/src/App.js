// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage/SignUpForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/AllSpots";
import IndivSpot from "./components/Spot";
import SignupFormPage from "./components/SignupFormPage";
import AddSpotComponent from "./components/AddSpot";
import CurrSpotsPage from "./components/GetCurrSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path="/signup">
            <SignupFormPage/>
          </Route>
          <Route path="/spots/current">
            <CurrSpotsPage/>
          </Route>
          <Route path="/spots/:id">
            <IndivSpot/>
          </Route>
          <Route path="/become-a-host">
            <AddSpotComponent/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
