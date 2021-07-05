import React from 'react'
import './App.css';

import Header from './components/Header'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">

            <Switch>
                <Route path="/checkout">
                  <Header />
                  <h1>Checkout</h1>
                </Route>
              {/* this is the home page route, default, by default if there is no route to go it will route the path 
              to "/" home page */}
                <Route path="/">
                  <Header />
                  <Home />
                </Route>

            </Switch>

        </div>
    </Router>
  );
}

export default App;
