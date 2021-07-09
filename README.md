# Amazon_clone

## Payment Integration and FireStore DB

Now in `/src/components/payments.js
```js
//src/components/payments.js

//.........

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
            type: "EMPTY_BASKET",
        })

        history.replace('/orders')

// add this dispatch to empty the basket,
```
and then add it to the `/src/reducer.js` so that it can listen to the event
```js
//src/reducer.js
case "EMPTY_BASKET":
    return {
        ...state,
        basket : []
    };
```
```js
//src/App.js
//......
<Route path="/orders">
    <Header />
    <Orders />
</Route>
```

```
#### IntegrationError: Missing value for stripe.confirmCardPayment intent secret: value should be a client_secret string.
```
***************************************************************************************************
## Push orders into database
goto ```firebase.com --> firestore --> create Database --> start test mode -->```
below is the code of our `firebase.js`
```js
//src/firebase.js
import firebase from 'firebase';
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

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
```

```js
//src/components/payment.js
import { db } from './firebase'
//.....


```


