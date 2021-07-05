# Amazon_clone
***How to Build

first of all create react app ``` npx create-react-app <app_name>```, after that make a project on firebase by the name of ```<app_name>``` for backend purposes.

move to the project directory ```cd <app_name> ``` and start the react package ```npm start```

register your ```<project>``` on fire base as web

install firebase-tools ```npm install -g firebase-tools```
goto `project settings` in firebase settings, and select config radio button and copy the config code and paste it into `src/firebase.js`

```js
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyQXDbroYMR2V4FORIb1UdDc22K5Dw5RU",
  authDomain: "clone-4cb1b.firebaseapp.com",
  projectId: "clone-4cb1b",
  storageBucket: "clone-4cb1b.appspot.com",
  messagingSenderId: "648702785388",
  appId: "1:648702785388:web:09f8c365d4c113373ae549",
  measurementId: "G-PGJ2ZPT133"
};
```
Now let's build...will back to Firebase later

clean your code by deleting `App.test.js, logo.svg, setupTest.js`
and also clean `App.css, App.js, Index.css`
```js
//src/App.js
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <h1>Hello world, Let's build Amazon Clone</h1>
    </div>
  );
}

export default App;
```

Installing React-bootstrap ```npm install react-bootstrap bootstrap@4.6.0```
importing bootstrap CSS to `src/index.js` ```import 'bootstrap/dist/css/bootstrap.min.css';```

change the favicon by replacing the react favicon with the amazon favicon in `public/favicon.ico`

Adding and customizing Header component
```js
//src/components/Header.js
import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';



function Header() {
    return (
        <div className="header">
            <img
            className="header__logo"
            src='https://pngimg.com/uploads/amazon/amazon_PNG25.png'
            alt=''
            />

            <div className="header__search">
                <input
                className="header__searchInput"
                type="text"
                />
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">Hello Guest</span>
                    <span className="header__optionLineTwo">Sign In</span>
                </div>

                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>

                <div className="header__option">
                    <span className="header__optionLineOne">your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>

                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">0</span>
                </div>

            </div>
        </div>
    )
}

export default Header

```
```css
/* src/components/Header.css */
.header{
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #131921;
    position: sticky;
    top: 0;
    z-index: 100;
}


.header__logo{
    width: 100px;
    object-fit: contain;
    margin: 0 20px;
    margin-top: 18px;
}

.header__search{
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 24px;
}

.header__searchInput{
    height: 12px;
    padding: 10px;
    border: none;
    width: 100%;
}

.header_searchIcon{
    padding: 5px;
    height: 22px !important;
    background-color: #cd9042;
}

.header__optionLineOne{
    font-size: 10px;

}

.header__optionLineTwo{
    font-size: 13px;
    font-weight: 800;
}

.header__optionBasket{
    display: flex;
    align-items: center;
    color: white;
}

.header__basketCount{
    margin-left: 10px;
    margin-right: 10px;
}

.header__nav{
    display: flex;
    justify-content: space-evenly;
}

.header__option{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    color: white;
}


```

Install Material UI ```npm install @material-ui/core , npm install @material-ui/icons``` Now we can import fonts and icons

the way to use Material UI

```js
// src/components/Home.js
import React from 'react';
import { Button } from '@material-ui/core';

function App() {
  return <Button color="primary">Hello World</Button>;
}
```

```js
import React from 'react'
import './Home.css'
import Product from './Product'
import {  Container } from 'react-bootstrap'

function Home() {
    return (
        <div className="Home">
            <div className="Home-container">
                <div
                    className="Home-banner"
                    style={{backgroundImage: "url(https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_TallHero_Gamers_en_US_1x._CB667161802_.jpg)"}}>

                </div>

                <div className="Home-content">

                    <div className="Home-row">
                        <Product id="123456"
                                title="Oculus"
                                price={29.99}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg"
                                rating={4} />
                        <Product id="123457"
                                title="AmazonBasics"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
                                rating={5} />
                    </div>
                    <div className="Home-row">
                        <Product id="123458"
                                title="Gaming accessories"
                                price={29.99}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg"
                                rating={4} />
                        <Product id="123459"
                                title="Beauty picks"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
                                rating={5} />
                        <Product id="123459"
                                title="Shop Laptops & Tablets"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg"
                                rating={5} />
                        <Product id="1234500"
                                title="Explore home bedding"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg"
                                rating={5} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
```

```css
/* src/components/Home.css */
.Home-row {
    display: flex;
}

.Home-content {
    margin-top: -350px;
}

.Home-banner {
    height: 600px;
    background-size: cover;
    background-position: center;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
```

Now we are going to introduce Route, using React Router
first of all install react router dom ```npm i react-router-dom```
Wrap everything of `App.js` in `Router`.
we didn't want to render the Route in the Home bcz we want to render it on the base of the route that we are in.
```js
// src/App.js
//...
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//...

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        {/* Make sure your default route is at the bottom.
        and know we can add as many routes as we want */}
            <Route path="/checkout">
                <Header />
                <h1>Checkout</h1>
            </Route>
            {/* this is the home page route, default, by default if there is no route to go it will route the path to "/" home page */}
            <Route path="/">
                <Header />
                <Home />
            </Route>

          </Switch>

      </div>
    </Router>
  );
}
//...
```

add route to the Amazon logo and Cart icon
```js
//....
import { Link } from 'react-router-dom'
//....

//...
            <Link to="/">
                <img
                className="header__logo"
                src='https://pngimg.com/uploads/amazon/amazon_PNG25.png'
                alt=''
                />
            </Link>

//....

//....
            <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">0</span>
                </div>
            </Link>
//...
```
Checkout.js in initial stage, Now we have to add components to the Checkout.js e.g subtotal and checkout
```js
//drc/components/Checkout.js
import React from 'react'
import './Checkout.css'

function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                src="https://storage.googleapis.com/kaggle-datasets-images/33019/43260/700145bfae13a80a07bdeb33fe674ad0/data-original.jpg?t=2018-06-24-10-27-14"
                alt=""/>

            <div>
                <h2 className="checkout__title">Your Shopping Basket</h2>
            </div>

            </div>

            <div className="checkout__right">
                <h2>the Sub-Total will go here</h2>
            </div>
        </div>
    )
}

export default Checkout
```

to render money or currency install --> `npm i react-currency-format`
```js
//src/components/Subtotal.js
import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { Button } from 'react-bootstrap';


function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Sub-total (0 items):<strong>0</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />This order Contain a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />

                <Button variant="warning">Proceed to Checkout</Button>
        </div>
    )
}

export default Subtotal
```

