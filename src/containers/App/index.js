import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import  LandingForm  from '../LandingForm';
import Body from '../Body';
import '../../reset.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingForm} />
        <Route path="/results" component={Body} />
      </div>
    );
  }
}

export default App;
