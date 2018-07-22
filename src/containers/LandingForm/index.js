import React, { Component } from 'react';
import { fetchEvents } from '../../actions';
import { connect } from 'react-redux';

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

  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Scene-It</h1>
        </header>
        <form onSubmit={this.props.fetchEvents}className="landing-form">
          <label htmlFor="location"></label>
          <input id="location" placeholder="location" onChange={this.handleChange} />
          <label htmlFor="keywords" /> 
          <input id="keywords" placeholder="keywords" onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (url) => dispatch(fetchEvents(url))
});

connect(null, mapDispatchToProps)(LandingForm)