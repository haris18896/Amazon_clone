# Amazon_clone

##Payment Integration

##Integrating Stripe Payment Method
first of all, we need to install some dependencies.

```bash
npm install @stripe/stripe-js
npm install @stripe/react-stripe-js
```
1: next we have to create a stripe account.
2: make sure you are on the blaze plan on firebase
upgrade the blaze on firebase it's free

login on Stripe.com
then goto the `your test API keys`
```
Your API keys               `Test mode`
Publishable key             'pk_test_51JAmrZHsNUk0QSokC1Nj5ikhTIsLFkO86R3uEyyeBKZM2bEEuEr56Lvhq0xEHyJBlnh7BIGKMI9rJsk3y35kAeb3000YP6S59C'
Secret key                  ***********
```
we need this Publishable key and Secret key on backend

Now go to Developers --> API keys, it's here where you can find your API key.
copy Publishable key...and goto `/src/App.js`

```js
//src/App.js
//......
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from './@stripe/react-stripe-js'
//paste publishable key as a string
const promise = loadStrip( 'pk_test_51JAmrZHsNUk0QSokC1Nj5ikhTIsLFkO86R3uEyyeBKZM2bEEuEr56Lvhq0xEHyJBlnh7BIGKMI9rJsk3y35kAeb3000YP6S59C'
)

function App() {
    //.....
}
```
Now we go down to Payment route and use Higher order function
```js
//src/App.js
<Route path="/payment">
    <Header />
    <Elements stripe={promise}>
        <Payment />
    </Elements>
</Route>
```
Now we are going to create a form for Payment method
```js
//src/components/payment.js
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
//.......
function Payment(){
    //...
    const stripe = useStripe();
    const element = useElements();

    const handleSubmit = e => {
        // do all the fancy stripe stuff
    }

    const handleChange = event => {
        // listen for changes in cardElement
        // and display any errors as the customer types their card details
    }

    //....

    <div className="payment__details">
        {/* stripe magic goes here */}
        <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
        </form>
    </div>
}
```
Nothing will be shown at this point. for that we have to styled the component
```css
/* src/components/Payment.css */
.payment__address, .payment__details, .payment__items{
    flex: 0.8;
    color: white;
}
```
we need to functions handleSubmit for submitting the card details and handleChange

now we need to state of buttons , one for error , one for disabled state.

```js
//src/components/Payment.js
//....
const stripe = useStripe();
const element = useElements();

const [error, setError] = useState(null);
const [disabled, setDisabled] = useState(true);
const [succeeded, setSucceeded] = useState(false);
const [processing , setProcessing] = useState("");
//....

//....
<div className="payment__details">
    {/* stripe magic goes here */}
    <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange}/>

        <div className="payment__priceContainer">
        <CurrencyFormat
            renderText={(value) => (
                    <h3>Order Total: {value}</h3>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />
            <Button variant="outline-info" disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
            </Button>
        </div>

        {/* Error */}
        {error && <div>{error}</div>}
    </form>
</div>
```
 handleSubmit and handleChange are the most important functions...

 in the handleSubmit we have to use the Client Secret function, so that the client payment shouldn't be shown to others.
 and for that we also have to use `useEffect`, 
 #### to generate the special stripe secret, when ever the basket changes we get a new

 ``` npm install axios ```
and create a file called `/src/axios.js`

```js
import axios from 'axios';

const instance = axios.create({
    // the API (cloud function) URL
    baseURL: '...'
})

export default instance;
```

Now here we are going to prepare everything up , the axios method is a post method

```js
 //src/components/Payment.js
 //...
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import { Button } from 'react-bootstrap;
import axios from '../axios'

//....

const [succeeded, setSucceeded] = useState(false);
const [processing , setProcessing] = useState("");
const [clientSecret, setClientSecret] = useState(true);

useEffect(() => {
    const getClientSecret = async () => {
        // ? is a queryParam
        const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies submits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,//  100 is currency sub unit, like USD to cents
            });
            setClientSecret(response.data.clientSecret)

    }

    getClientSecret();
}, [basket])

const handleSubmit = async event => {
    // do all the fancy stripe 
    event.preventDefault();
    setProcessing(true) //now you can only click the 'Buy Now button only once'
    // client Secret

    // const payload = await stripe
}

const handleChange = event => {
    // listen for changes in cardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
}
 ```

```js
//src/components/payment.js
import axios from '../axios'

//....
const history = useHistory();


useEffect(() => {
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
}, [basket])

const handleSubmit = async event => {
    // do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true) //now you can only click the 'Buy Now button only once'
    // client Secret
    //confirming card payment
    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({ paymentIntent }) => {
        //paymentIntent is equal to paymentConfirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        History.replace('/orders')
    })
}

const handleChange = event => {
    // listen for changes in cardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
}
```

Now we are going to build Backend to support the above functions.
we yet to have write the cloud base URL in `/src/axios.js`

Now we are jumping too cloud 
*******************************************************************************************


