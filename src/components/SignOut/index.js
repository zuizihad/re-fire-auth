import React from 'react';
import { withFirebase } from '../Firebase'

const SignOutButton = ({ firebase }) => (
  <button className="waves-effect waves-light btn material indigo" type="button" onClick={firebase.doSignOut}>Sign Out</button>
);
 
export default withFirebase(SignOutButton);