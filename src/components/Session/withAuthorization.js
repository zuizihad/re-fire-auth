import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../contants/routes'
import authUserContext from './context'
import { auth } from 'firebase'

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    if(!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGNIN);
                    }
                },
                () => {
                    this.props.history.push(ROUTES.SIGNIN);
                }
            )
        }

componentWillUnmount() {
    this.listener()
}
    render() {
        return (
            <authUserContext.Consumer>
                {
                    authUser => 
                        condition(authUser) ? <Component { ...this.props } /> : null
                }
            </authUserContext.Consumer>
        )}
    }
return compose(
    withRouter,
    withFirebase,
)(WithAuthorization)
   
}

export default withAuthorization;