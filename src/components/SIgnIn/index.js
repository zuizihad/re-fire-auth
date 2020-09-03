import React from 'react';
 
const index = () => (
  <>
  <div className="row">
  <div className="col l3"></div>
  <div className="col s12 l6 center">
  <h3 className="header">Sign In</h3>
  <div className="card hoverable">
    <div className="card-stacked">
      <div className="card-content">
      <div className="input-field">
      <i className="material-icons prefix">email</i>
          <input id="Email" type="email" className="validate"/>
          <label htmlFor="Email">Email Address</label>
        </div>
        <div className="input-field">
        <i className="material-icons prefix">lock</i>
          <input id="Password" type="password" className="validate"/>
          <label htmlFor="Password">Password</label>
        </div>
      </div>
      <div className="card-action">
      <a className="waves-effect waves-light btn material indigo">sign in</a>
      <h6>Forgot Password???</h6>
      </div>
    </div>
  </div>
</div>
<div className="col l3">

</div>
</div>

  <div className="center">
    <h6>Don't have an account?Sign Up</h6>
  </div>

  </>
);
 
export default index;