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
```

