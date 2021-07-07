import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { Button } from 'react-bootstrap'
import { useStateValue } from '../StateProvider'
import { getBasketTotal } from '../reducer';
import { useHistory } from 'react-router-dom';



function Subtotal() {

    const history = useHistory()
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

            <Button className="button" onClick={e => history.push('/payment')}  variant="warning">Proceed to Checkout</Button>
        </div>
    )
}

export default Subtotal
