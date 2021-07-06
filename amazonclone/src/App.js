/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import React, { useEffect } from 'react'
import './App.css';

import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
// import SignUp from './components/SignUp'

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('This User is >>>>>', authUser);

      if (authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    <Router>
        <div className="App">

            <Switch>
                <Route path="/login">
                  <Login />
                </Route>

                {/* <Route path="/SignUp">
                  <SignUp />
                </Route> */}

                <Route path="/checkout">
                  <Header />
                  <Checkout />

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
