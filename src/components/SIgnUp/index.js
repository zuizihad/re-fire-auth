import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../contants/routes'
import * as ROLES from '../contants/roles' 
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
const SignUpPage = () => (
  <div>
    <SignUpForm/>
    <SignUpLink/>
  </div>
);
 
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null

}



class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event =>{
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles ={};
    if(isAdmin){
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // create a user in your firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({error})
      })

      event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  }
  render(){
    const { username, email, passwordOne, passwordTwo,isAdmin, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne ===''||
      email ===''||
      username ==='';

    return(
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col l3"></div>
            <div className="col s12 l6 center">
              <h3 className="header">Sign Up</h3>
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
                    />
                  <label htmlFor="passwordTwo">Password</label>
                </div>
              </div>
              <label>
                Admin:
                <input 
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={this.onChangeCheckbox}
                />
              </label>
              <div className="card-action">
                <button className="waves-effect waves-light btn material indigo" disabled={isInvalid} type="submit">Sign Up</button>
                  { error && <p>{error.message}</p> }     
              </div>
            </div>
          </div>
        </div>
      <div className="col l3">
      </div>
    </div>
  </form>
)}
}

const SignUpLink = () => (
  <p className="center">
    Wanna Log in? <Link to={ROUTES.SIGNIN}>Sign In</Link>
  </p>
);

const SignUpForm =compose(withRouter, withFirebase,)(SignUpFormBase)

export default SignUpPage

export { SignUpLink, SignUpForm }