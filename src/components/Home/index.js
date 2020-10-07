import React from 'react';
import { compose } from 'recompose';

import { withEmailVerification, withAuthorization } from '../Session'
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>THis page is accessible ny every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);