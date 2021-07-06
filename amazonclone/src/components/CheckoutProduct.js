/* eslint-disable no-unused-vars */
import React from 'react'
import './CheckoutProduct.css'
import {Button} from 'react-bootstrap'
import { useStateValue } from '../StateProvider';

function CheckoutProduct({id, image, title, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
            // Now add this action to reducer
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image}  alt=""/>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price"><small>$</small><strong>{price}</strong></p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                <Button variant="outline-danger" onClick={removeFromBasket}>Remove from Basket</Button>
            </div>
        </div>
    )
}

export default CheckoutProduct
