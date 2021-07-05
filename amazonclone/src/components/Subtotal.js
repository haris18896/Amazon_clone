import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { Button } from 'react-bootstrap'


function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Sub-total (0 items):<strong>0</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />This order Contain a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />

            <Button className="button"  variant="warning">Proceed to Checkout</Button>
        </div>
    )
}

export default Subtotal
