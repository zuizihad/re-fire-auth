import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../contants/routes'


const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
  </div>
);
 
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null

}



class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event =>{

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render(){
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne ===''
      email ===''
      username ==='';

    return(
      <form onSubmit={this.onSubmit}>
          <>
  <div className="row">
  <div className="col l3"></div>
  <div className="col s12 l6 center">
  <h3 className="header">Sign In</h3>
  <div className="card hoverable">
    <div className="card-stacked">
      <div className="card-content">
      <div className="input-field">
      <i className="material-icons prefix">account_circle</i>
          <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="User Name"
        />
          <label htmlFor="username">User Name</label>
        </div>
        <div className="input-field">
        <i className="material-icons prefix">email</i>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />
          <label htmlFor="email">Email</label>
        </div>
      </div>

      <div className="card-content">
      <div className="input-field">
      <i className="material-icons prefix">lock</i>
          <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
          <label htmlFor="passwordOne">Password</label>
        </div>
        <div className="input-field">
        <i className="material-icons prefix">lock</i>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
          <label htmlFor="passwordTwo">Password</label>
        </div>
      </div>


      <div className="card-action">
      <a className="waves-effect waves-light btn material indigo" disable={isInvalid} type="submit">Sign Up</a>
      { error && <p>{error.message}</p> }
      <h6>Forgot Password???</h6>
      </div>
    </div>
  </div>
</div>
<div className="col l3">

</div>
</div>

  </>
      </form>
    )
  }
}

const SignUpLink = () => {
  <p>Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link></p>
}

export default SignUpPage

export { SignUpLink, SignUpForm }