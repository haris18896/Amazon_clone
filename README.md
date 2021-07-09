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

const payload = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
        card: elements.getElement(CardElement)
    }
}).then(({ paymentIntent }) => {

    db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        })

    setSucceeded(true);
    setError(null);
    setProcessing(false);

```
*******************************************************************************************************

Now goto `/src/components/Orders.js`

```js
//src/components/Orders.js
import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'


function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            setOrders([])
        }

    }, [user])


     return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders

```

in the `useEffect` we are saying that if the `user` exist then in the firebase DB, goto the `users collection` then in `users collection` then get the specific user that's logged in at that time making the `uid`, then we are accessing the `orders` of that particular `users` which give us access to `orders collection` of that user.

and then we are saying that all these `orders` that are inside the `orders collection` order them by `date created and in descending order` means the most recent will be oon top.

`onSnapshot`  will show all your orders in real time, instead of this we can also redirect the user to a Thank you page. but here all the orders of the users that they ordered will be displayed. and then put all the data in `data: doc.data()`

if we want to protect the above procedure we have to assign those order to the user, that's why we add that block of code in `if` statement 
```js
 if(user){
     //db block code
}
``` 


Now he to create `/src/components/Order.js` because we have to show that order on the orders page.
```js
//src/components/Orders.js
//......
<div className='orders__order'>
    {orders?.map(order => (
        <Order order={order} />
    ))}
</div>
```

Now create `Order.js` and `Order.css`

```js
import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />   
        </div>
    )
}

export default Order
```
```css
.order {
    padding: 40px;
    margin: 20px 0;
    border: 1px solid #a9a9a9;
    background-color: white;
    position: relative;
}

.order__id {
    position: absolute;
    top: 40px;
    right: 20px;
  }

.order__total {
    font-weight: 500;
    text-align: right;
  }
  ```
we have to de-structure the props, and say give me the order```function Order({ order })```

Now we have to install `moment`
```
npm install moment
```
and then import it into `Order/js`.
`Moment` JS is a JavaScript date library for parsing, validating, manipulating, and formatting dates.
`hideButton` we have to hide the `remove from basket button` n orders page. and also add `hideButton` as a de-structured props into `CheckoutProduct`

also replace the button code in `/src/components/CheckoutProduct.js` to the given code. so that it will only render the button if the hideButton is not called

```js
function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    //.........

        {!hideButton && (
            <Button variant="outline-danger" onClick={removeFromBasket}>Remove from Basket</Button>
        )}
```

Now we are going to link `Returns and Orders` in Header to Orders page.
in `axios.js` we have a local host baseURL, to test because it's really very fast
```    baseURL: "http function initialized (http://localhost:5001/clone-4cb1b/us-central1/api)"```

When ever you have a functions to deploy, use the given command to deploy backend.
```
firebase deploy --only functions
```

also at this point it probably gonna fail.what you need to do is goto the firebase and update/upgrade `blaze` or `spark`.
it will be in the bottom.

you have to change the plan to `blaze` from 'spark`, enter your card, but it's actually free.
deployment will complete if you are on blaze plan.

firebase --> functions --> grab the link for baseURL
to copy that URL you must have to be on `Blaze plan`

`baseURL` is our endpoint api which says `Hello world`
```js
//functions/index.js
// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
```
Now our url is live. and we don't need to run it locally.

`cd ../` go back to the project folder from functions.
and run `npm run build` so that we can deploy the front end.

at this point if you run `firebase deploy` it will try to deploy the front end and the backend which are the functions. instead we only have to deploy the front end, because we already have deployed the backend to the cloud functions with `firebase deploy --only functions`
now 

``` firebase deploy --only hosting```

```###hosting is the frontend and functions are the backend.```
**********************************************************************************************************

