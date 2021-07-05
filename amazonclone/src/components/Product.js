import React from 'react'
import './Product.css'
import {useStateValue} from '../StateProvider'


function Product({id, title, image, price, rating}) {
    const [{ basket }, dispatch] = useStateValue();

    console.log('this is the Basket >>>', basket);

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
            <button onClick={addToBasket}>Add to Cart</button>
        </div>

    )
}

export default Product
