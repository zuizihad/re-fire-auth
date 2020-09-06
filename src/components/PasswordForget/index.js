import React from 'react';
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../contants/routes'

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm/>
  </div>
)

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error =>{
        this.setState({ error })
      })
      event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, error } = this.state;
    const isInvalid = email===''

    return(
      <form onSubmit={this.onSubmit}>
      <div className="row">
        <div className="col l3"></div>
          <div className="col s12 l6 center">
            <h3 className="header">Forgot Password</h3>
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
                    </div>
                  <div className="card-action">
                    <button className="waves-effect waves-light btn material indigo" disabled={isInvalid} type="submit">Reset Password</button>
                      { error && <p>{error.message}</p> }     
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
                
    )
  }
}

const PasswordForgetLink = () =>(
  <p className="center">
    <Link to={ROUTES.PASSWORD_FORGET}>Forget Password?</Link>
  </p>
)

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)
export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }