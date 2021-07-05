import React from 'react'
import './Product.css'


function Product({id, title, image, price, rating}) {
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
            <button >Add to Cart</button>
        </div>

    )
}

export default Product
