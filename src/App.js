import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/Navigation/index'
import Landing from './components/Landing'
import Home from './components/Home'
import SignUp from './components/SIgnUp'
import SignIn from './components/SIgnIn'
import Account from './components/Account'
import Admin from './components/Admin'
import PasswordForgetPage from './components/PasswordForget'
import * as ROUTES from './components/contants/routes'
import { auth } from 'firebase';
import { withAuthentication } from './components/Session'

const App = () => (
      <div>
      
      <Router>
        <Navigation/>
          <hr/>
            <Route exact path={ROUTES.LANDING} component={Landing}/>
            <Route path={ROUTES.HOME} component={Home}/>
            <Route path={ROUTES.SIGNUP} component={SignUp} />
            <Route path={ROUTES.SIGNIN} component={SignIn}/>
            <Route path={ROUTES.ACCOUNT} component={Account}/>
            <Route path={ROUTES.ADMIN} component={Admin}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      </Router>
      
      </div>
)
export default withAuthentication(App);