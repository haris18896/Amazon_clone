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