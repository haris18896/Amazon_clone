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


