import React from 'react'
import './Product.css'
import {useStateValue} from '../StateProvider'
import { Button } from 'react-bootstrap'


function Product({id, title, image, price, rating}) {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        //dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };
    return (

        <div className="Product">
            <div className="Product-description">
                <span className="Product-title">{title}</span>
                <span className="Product-price"><small>$</small><strong>{price}</strong></span>
                <span className="Product-rating">
                    {Array(rating).fill().map((_, i) => (
                    <p>🌟</p>
                    ))}
                </span>
            </div>
            <img src={image} alt=""/>
            <Button className="btn_add_to_cart" variant="outline-warning" onClick={addToBasket}>Add to Cart</Button>
        </div>

    )
}

export default Product
