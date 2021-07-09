/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import React, { useEffect } from 'react'
import './App.css';

import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import Orders from './components/Orders'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
// import SignUp from './components/SignUp'

const promise = loadStripe("pk_test_51JAmrZHsNUk0QSokC1Nj5ikhTIsLFkO86R3uEyyeBKZM2bEEuEr56Lvhq0xEHyJBlnh7BIGKMI9rJsk3y35kAeb3000YP6S59C")


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
              <Route path="/orders">
                  <Header />
                  <Orders />
                </Route>

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

                <Route path="/payment">
                  <Header />
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
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
