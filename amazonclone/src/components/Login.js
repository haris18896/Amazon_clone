import './Login.css'
import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Button, Row, Col } from 'react-bootstrap'

import { auth } from '../firebase'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    
    const register = e => {
      e.preventDefault();
      // firebase registration stuff goes here
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //successfully created a user email and Password
        console.log(auth)
        if (auth){
          history.push('/')
        }
      })
      .catch(error => alert(error.message))
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


