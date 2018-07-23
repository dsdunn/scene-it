import React, { Component } from 'react';
import { connect } from 'react-redux';

import { urlBuilder } from '../../helper';
import { fetchEvents } from '../../thunks/fetchEvents';

export class LandingForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
      keywords: ''
    };
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]:value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = urlBuilder(this.state);
    this.props.fetchEvents(url);
    this.props.history.push('/results');
  }

  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Scene-It</h1>
        </header>
        <form onSubmit={this.handleSubmit}className="landing-form">
          <label htmlFor="location"></label>
          <input id="location" placeholder="location" onChange={this.handleChange} />
          <label htmlFor="keywords" /> 
          <input id="keywords" placeholder="keywords" onChange={this.handleChange} />
          <button>Get Events</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (url) => dispatch(fetchEvents(url))
});

export default connect(null, mapDispatchToProps)(LandingForm);