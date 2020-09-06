import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
        <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col l3"></div>
            <div className="col s12 l6 center">
              <h3 className="header">Password Change</h3>
                <div className="card hoverable">
                  <div className="card-stacked">
                    <div className="card-content">
                      <div className="input-field">
                        <i className="material-icons prefix">lock</i>
                          <input
                          name="passwordOne"
                          value={passwordOne}
                          onChange={this.onChange}
                          type="password"
                          />
                        <label htmlFor="passwordOne">New Password</label>
                      </div>
                      <div className="input-field">
                        <i className="material-icons prefix">lock</i>
                          <input
                          name="passwordTwo"
                          value={passwordTwo}
                          onChange={this.onChange}
                          type="password"
                          />
                        <label htmlFor="passwordTwo">Confirm Password</label>
                      </div>
                      </div>
                    <div className="card-action">
                      <button className="waves-effect waves-light btn material indigo" disabled={isInvalid} type="submit">Password Change</button>
                        { error && <p>{error.message}</p> }     
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);