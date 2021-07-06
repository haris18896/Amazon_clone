# Amazon_clone
## React Firebase Authentication

first of all Create a login route in `/src/App.js`
```js
//....
<Route path="/login">
    <Login />
</Route>

<Route path="/SignUp">
    <SignUp />
</Route>
//....
```

```js
//src/components/Header.js
//....
<div className="header__nav">
    <Link to="/login">
        <div className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">Sign In</span>
        </div>
    </Link>

</>
//....
```
```js
//src/components/login.js
import './Login.css'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
      e.preventDefault();

      //firebase login stuff goes here
    }

    const register = e => {
      e.preventDefault();

      // firebase registration stuff goes here
    }

    return (
        <Container className="login">
            <Row>
              <Col>
                <Link to="/">
                  <img className="login__img" src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="" />
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className=" ctn_login login__container">
                  <div className="col-md-6 m-auto">
                    <h1 className="login__signIn" >Sign In</h1>

                    <form>

                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control"
                          id="email" aria-describedby="emailHelp" placeholder="Enter email" 
                         value={email} onChange={e => setEmail(e.target.value)}/>
                        <small id="emailHelp" className="form-text text-muted">
                          Email that you have used while registration.
                        </small>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control"
                         id="password" placeholder="Password"
                         value={password} onChange={e => setPassword(e.target.value)} />
                      </div>

                      <div className="form-check">
                        <input type="checkbox" name="checkbox" className="form-check-input" id="remember" />
                        <label className="form-check-label" htmlFor="remember">
                          Remember me
                        </label>
                      </div>

                      <Button type="submit" variant="info" className="btn float-right btn_mrg"
                        onClick={signIn}>
                        Login
                      </Button>

                      <Button variant="outline-secondary" onClick={register} className="btn float-left btn_mrg">Create Account</Button>


                    </form>
                  </div>
              </div>
              </Col>
            </Row>

        </Container>
    )
}

export default Login


```

Now we are going to add the Firebase authentication functionality in the above functions we created for login and registration.

`firebase --> Authentication --> sign-in method --> enable Email/Password and then Save`

```
npm i firebase
npm i firebase-tools
npm install --save firebase
```

Now goto the `/src/firebase.js`

```js
// src/firebase.js
import firebase from 'firebase';
//....
//....
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
```
```js
//src/components/login.js
import { auth } from '../firebase'
//.....

const register = e => {
    e.preventDefault();
    // firebase registration stuff goes here
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      //successfully created a user email and Password
      console.log(auth)
    })
    .catch(error => alert(error.message))
  }
```

At this point when we enter our credentials in the email and password field, and click on create account Button, our account will be created. you will see it as an object in the Inspect.

Now we have to push this to the home page using `useHistory`
```js
//src/components/login.js
import { Link, useHistory } from 'react-router-dom'
//...

const register = e => {
      e.preventDefault();
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth)
        if (auth){
          history.push('/')
        }
      })
      .catch(error => alert(error.message))

    }
```

```js
//src/components/login.js
const signIn = e => {
      e.preventDefault();
      //firebase login stuff goes here
      auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push('/')
      })
      .catch(error => alert(error.message))
    }
```
```js
//src/App.js
import { auth } from './firebase';
//.....
function App() {
  useEffect(() => {
    // will only run once when the app component loads
    // it's like a dynamic if statement

    auth.onAuthStateChanged(authUser => {
      console.log('This User is >>>>>', authUser);

      if (authUser){
        //the user was logged in / or just logged in 
      } else {
        // user was Logged out
      }
      
    })
  },[])

```
Now we have to add user to our store `/src/reducer.js` as initially a null user or as an initial state
```js
//src/reducer.js
export const initialState = {
    basket : [],
    user : null,
};
//....
```
so Now we have to dispatch the user if the user is authenticated to the data layer
```js
//src/App.js
import { useStateValue } from './StateProvider';
//....
function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('This User is >>>>>', authUser);

      if (authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

//.....
```
Now we are going to make a case that will lesson to the above code
```js
case 'SET_USER':
    return {
        ...state,
        user: action.user //this is the user that we have dispatched from App.js
    }
```
Now the browser will remember it.

```js
//src/components/header.js
import { auth } from './firebase'

function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }

    //......
    //if there is no user then and only then push to login page
    <Link to={!user && '/login'}>
        <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">Hello {user? user.email : 'guest'}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
    </Link>
```


