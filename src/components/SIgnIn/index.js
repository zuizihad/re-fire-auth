import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../contants/routes'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import { PasswordForgetLink } from '../PasswordForget'
const SignInPage = () => (
  <div>
    <SignInForm/>
    <SignInGoogle/>
    <SignInFacebook/>
    <SignInTwitter/>
    <PasswordForgetLink/>
    <SignInLink/>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null

}
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event =>{
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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
  render(){
    const { email, password, error } = this.state;
    const isInvalid =
      password===''||
      email ==='';

    return(
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col l3"></div>
            <div className="col s12 l6 center">
              <h3 className="header">Sign In</h3>
                <div className="card hoverable">
                  <div className="card-stacked">
                    <div className="card-content">
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
                    <div className="input-field">
                      <i className="material-icons prefix">lock</i>
                        <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="card-action">
                    <button className="waves-effect waves-light btn material indigo" disabled={isInvalid} type="submit">Sign In</button>
                      { error && <p>{error.message}</p> }     
                  </div>
                </div>
              </div>
            </div>
          <div className="col l3">
          </div>
        </div>
      </form>
    )
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null}
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
       // Create a user in your Firebase Realtime Database too
       return this.props.firebase
       .user(socialAuthUser.user.uid)
       .set({
         username: socialAuthUser.user.displayName,
         email: socialAuthUser.user.email,
         roles: {},
       });  
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault();
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="center">
        <button className="waves-effect waves-light btn material indigo" type="submit">SignIn With Google</button>
        { error && <p>{error.message}</p> }
      </form>
    )
  }
}
class SignInfacebookBase extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null}
  }
  onSubmit = event => {
    this.props.firebase
    .doSignInWithFacebook()
    .then(socialAuthUser => {
    // Create a user in your Firebase Realtime Database too
    return this.props.firebase
      .user(socialAuthUser.user.uid)
      .set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      })
    })
    .then(() => {
      this.setState({ error: null })
      this.props.history.push(ROUTES.HOME)
    })
    .catch(error => {
      this.setState({ error })
    })
    event.preventDefault();
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="center"style={{margin:10}} >
        <button type="submit" className="waves-effect waves-light btn material indigo">SignIn With Facebook</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}
class SignInTwitterBase extends Component {
  constructor(props){
    super(props);
    this.state = {error: null};
  }
  onSubmit = event => {
    this.props.firebase
    .doSignInWithTwitter()
    .then(socialAuthUser => {
    // Create a user in your Firebase Realtime Database too
    return this.props.firebase
      .user(socialAuthUser.user.uid)
      .set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      })
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
    })
    .catch(error => {
      this.setState({ error })
    })
    event.preventDefault();
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="center">
        <button type="submit" className="waves-effect waves-light btn material indigo">SignIn With Twitter</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}
const SignInLink = () => (
  <p className="center">
    Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
  </p>
);

const SignInForm =compose(withRouter, withFirebase,)(SignInFormBase)
const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);
const SignInFacebook = compose(withRouter, withFirebase)(SignInfacebookBase);
const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase);

export default SignInPage

export { SignInLink, SignInForm, SignInTwitter, SignInFacebook, SignInGoogle }