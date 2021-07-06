# Amazon_clone
*** React Context API

The React Context API is like a Redux, which is used to push data to the data layer.
for example; when we press `Add to Cart` button the data will be sent to data layer and from their the cart will be updated, so this way our site wouldn't be reloaded again and again, we just have to push that data to data layer or can say to Store in Redux.

for this process we have to create a `State Provider`.
do know that Redux and Context API are not same but they have same pattern.
`Step #1`
```js
// src/StateProvider.js
import React, { createContext, useContext, useReducer } from 'react'

//prepares the data layer
export const StateContext = createContext();

//wrap our app and provide the data layer
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// pull information from data layer
export const useStateValue = () => useContext(StateContext)
```

`Step #2`
Now in `/src/index.js` we have to wrap our component using StateProvider, so that every component can get access to the data layer

```js
//src/index.js
import StateProvider from './StateProvider'

//.....
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

`Step #3`
Create `/src/reducer.js`
A reducer is essentially how we are able to dispatch the action(add to basket) in the data layer
```js
export const initialState = {
    basket : [],
};
```

```js
//src/index.js
import reducer, { initialState } from './Reducer'
```
Reducer is something that always listening for dispatch
the action in reducer is what you want to do here, you want to add to the basket, remove from the basket etc
```js
//src/reducer.js
//....
const reducer = {state, action} => {
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,   //what ever the state originally was
                basket: [...state.basket , action.item],      //change the basket
            };
        default:
            return state,
    }
};

export default reducer;
```

`Step #4`
Now we need to connect our `addToBasket` so that we can push something inside

in order to pull the data from data layer, we have to `useSateProvider` in products.js

```js
//src/components/Products.js
//.......
import {useStateValue} from '../StateProvider'
//.......
function Product({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

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
        //........
```

Now adding the dynamic functionality to the cart item in the Header.js, so that on every Add too cart click it should update without reloading.

```js
//src/components/Header.js
//.....
import { useStateValue } from '../StateProvider'
//....

function Header() {
    const [{basket}, dispatch] = useStateValue();

    return (
        //.....
        <Link to="/checkout">
            {/* //... */}
            <span className="header__optionLineTwo header__basketCount">{basket.length}</span>
            {/* //... */}
```

Now we are going to build a selector in `/src/reducer.js`
```js
//src/reducer.js
//......
// selector, it's a fancy way of writing a for loop and incrementing everything and returning
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0)

//......
```
```js
//src/components/subtotal.js
import { getBasketTotal } from '../reducer';

function Subtotal() {
    const [{basket}, dispatch] = useStateValue();

//...
                renderText={(value) => (
                    <>
                        <p>Sub-total ({basket.length} items):<strong>{value}</strong></p>
//....
value={getBasketTotal(basket)}
//....

```
```js
//src/components/CheckoutProduct.js
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
```
```js
//src/components/CheckoutProduct.css
.checkoutProduct{
    display:flex;
    margin-top: 20px;
    margin-bottom: 20px;
}

.checkoutProduct__info{
    padding-left: 20px;
}

.checkoutProduct__image{
    object-fit: contain;
    width: 180px;
    height: 180px;
}

.checkoutProduct__rating{
    display:flex;
}

.checkoutProduct__title{
    font-size: 17px;
    font-weight: 800;
}
```

```js
//src/reducer.js
//.....
 case "REMOVE_FROM_BASKET":
    return{
        ...state,
        basket: state.basket.filter(item => item.id !== action.id)
    };
    //but the above code has a drawback, as it will remove all the same type of items on removeFromBasket button click,bcz every item of same id will be deleted. so for that we are going to do it like below code
//.....
{/* or can do this way*/}
 case "REMOVE_FROM_BASKET":
        // we have to find the index of the item
    const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
        );
        // copy the basket
        let newBasket= [...state.basket];

        if (index >=  0 ){
            newBasket.splice(index, 1);
        } else {
            console.warn(`can't remove product (id : ${action.id}) as it's not in the basket`)
        }

        return {...state,
            basket: newBasket
        };
```


