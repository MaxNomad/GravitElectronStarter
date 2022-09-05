import { Route, Switch } from "react-router-dom";
import React from 'react'
import Home from "./views/home";
import "./styles/main.css";

/**
 * @desc component "App".
 * @return {JSX.Element} - main component with routing
 */

const App = () => {
  return (
      <Switch>
        <Route exact path='/'component={Home} />
      </Switch>
  );
};

export default App;