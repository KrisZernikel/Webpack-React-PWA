import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React, { Suspense, lazy, memo } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Navbar from "./core/navbar/Navbar";

const Home = lazy(() => import("./pages/Home"));
const Learn = lazy(() => import("./pages/Learn"));

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const App = memo(function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <React.Fragment>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Switch location={location}>
                <Route exact path="/home" component={Home} />
                <Route exact path="/learn" component={Learn} />
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </Suspense>
          </React.Fragment>
        )}
      />
    </Router>
  );
});

ReactDOM.render(<App />, document.getElementById("shell"));
