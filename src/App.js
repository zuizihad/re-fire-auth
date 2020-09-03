import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation/index'
const App = () => (
  <div>
      <Router>
        <Navigation/>
      </Router>
  </div>
);
 
export default App;