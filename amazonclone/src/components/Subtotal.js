import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { Button } from 'react-bootstrap'
import { useStateValue } from '../StateProvider'
import { getBasketTotal } from '../reducer';



function Subtotal() {
    const [{basket}, dispatch] = useStateValue();



    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Sub-total ({basket.length} items):<strong>{value}</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />This order Contain a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />

            <Button className="button"  variant="warning">Proceed to Checkout</Button>
        </div>
    )
}

export default Subtotal
