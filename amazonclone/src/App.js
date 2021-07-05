import React from 'react'
import './App.css';

import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <Header />

            <Switch>
                <Route path="/checkout">
                  <Checkout />
                </Route>
              {/* this is the home page route, default, by default if there is no route to go it will route the path 
              to "/" home page */}
                <Route path="/">
                  <Home />
                </Route>

            </Switch>

        </div>
    </Router>
  );
}

export default App;
