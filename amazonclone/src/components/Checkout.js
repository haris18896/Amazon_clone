import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'


function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/TV/Sanyo/SanyoWebBanner01._CB1198675309_.jpg"
                alt=""/>

            <div>
                <h2 className="checkout__title">Your Shopping Basket</h2>
            </div>

            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
