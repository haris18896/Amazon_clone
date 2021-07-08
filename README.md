# Amazon_clone

## Payment Integration and FireStore DB

Now in `/src/components/payments.js
```js
//src/components/payments.js

//.........

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: "EMPTY_BASKET",
            })

            history.replace('/orders')
        })
// add this dispatch to empty the basket,
```
and then add it to the `/src/reducer.js` so that it can listen to the event
```js
//src/reducer.js
case "EMPTY_BASKET":
    return {
        ...state,
        basket : []
    };
```
```js
//src/App.js
//......
<Route path="/orders">
    <Header />
    <Orders />
</Route>
```
