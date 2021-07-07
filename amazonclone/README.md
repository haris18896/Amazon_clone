# Amazon Clone

## Firebase DB and Stripe Payment integration

```js
//src/components/Subtotal.js
//....
import { useHistory } from 'react-router-dom';

//....
    const history = useHistory()
//.....
//.....
            <Button className="button" onClick={e => history.push('/payment')}  variant="warning">Proceed to Checkout</Button>
```
if there is no Payment page, or payment route, the above code will redirect to home page, so now we have to add the payment route to `/src/App.js`

```js
//src/components/Payment.js

import React from 'react'
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { Link } from 'react-router-dom'


function Payment() {

    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>checkout ( <Link to="/checkout" >{basket?.length} items</Link> )</h1>
                <dv className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Pakistan Locomotive Factory</p>
                        <p>Risalpur 23200</p>
                    </div>

                </dv>

                <dv className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                    {basket.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
                    </div>
                </dv>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic goes here */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
```

```css
.payment{
    color: #fff;
}

.payment__container{
    text-align: center;
    padding: 10px;
    font-weight: 400;
}
.payment__container h1{
    border-bottom: 1px solid lightgray;
}
.payment__container > h1 a{
    text-decoration: None;
}

.payment__section{
    display: flex;
    border-bottom: 1px solid lightgray;
    margin: 0 20px;
    padding: 20px;
}

.payment__title{
    flex: 0.2;
}

.payment__address, .payment__items{
    flex: 0.8;
}

```

