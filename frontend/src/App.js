// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage/SignUpForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/AllSpots";
import IndivSpot from "./components/Spot";

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
          <Route exact path="/spots/:id">
            <IndivSpot/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
