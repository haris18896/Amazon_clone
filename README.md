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

            </div>
        </div>
    )
}

export default Header
```
```js
// src/components/Header.css
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
```

Install Material UI ```npm install @material-ui/core , npm install @material-ui/icons``` Now we can import fonts and icons

the way to use Material UI

```js
import React from 'react';
import { Button } from '@material-ui/core';

function App() {
  return <Button color="primary">Hello World</Button>;
}
```


