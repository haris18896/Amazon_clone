import './Login.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

function Login() {
    return (
        <Container className="login">

            <Link to="/">
                <img className="login__img" src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="" />
            </Link>

            <div className="login__container">
                <div className="col-md-6 m-auto">
                  <h1 className="login__signIn" >Sign In</h1>
                  
                  <form>

                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                      <small id="emailHelp" className="form-text text-muted">
                        Email that you have used while registration.
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                    </div>

                    <div className="form-check">
                      <input type="checkbox" name="checkbox" className="form-check-input" id="remember" />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>

                    <Button type="submit" variant="info" className="btn float-right">
                      Login
                    </Button>

                    <Link to="/SignUP">
                        <Button variant="outline-secondary" className="bnt float-left">Forgot password</Button>
                    </Link>

                  </form>
                </div>
            </div>
        </Container>
    )
}

export default Login


