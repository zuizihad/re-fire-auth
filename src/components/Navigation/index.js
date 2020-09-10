import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../contants/routes'
import SignOutButton from '../SignOut'
import { auth } from 'firebase'
import { AuthUserContext } from '../Session'
const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
        </AuthUserContext.Consumer>
    </div>
)

const NavigationAuth = () => (
    <nav className=" material indigo darken-2 ">
    <div className="nav-wrapper nav-extended navbar-fixed">
        <ul className="right hide-on-med-and-down">
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
    </nav>
)

const NavigationNonAuth = () => (
    <nav className=" material indigo darken-2 ">
    <div className="nav-wrapper nav-extended navbar-fixed">
        <ul className="right hide-on-med-and-down">
            <li>
                <Link to={ROUTES.SIGNIN}>Sign In</Link> 
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>       
        </ul>
    </div>
    </nav>
)

export default Navigation
