import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LandingForm.css'

import { urlBuilder } from '../../helper';
import { fetchEvents } from '../../thunks/fetchEvents';
import { fetchLocation } from '../../thunks/fetchLocation';
import { locationFetchSuccess } from '../../actions';

export class LandingForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
      keywords: '',
      useCurrent: false
    };
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]:value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.location.length) {
      await this.props.fetchLocation(this.state.location);
    }
    const url = urlBuilder({...this.state, location: this.props.location});
    await this.props.fetchEvents(url);
    this.props.history.push('/results');
  }

  useCurrent = (event) => {
    const setLocation = async (position) => {
      const coords = {lat: position.coords.latitude, lng: position.coords.longitude};
      await this.props.setLocation(coords)
      this.setState({
        location: this.props.location
      })
    }
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
      this.setState({
        useCurrent: !this.state.useCurrent
      })
    }
  }

  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Scene-It</h1>
        </header>
        <form onSubmit={this.handleSubmit}className="landing-form">
          <div>
            <input type="checkbox" id="use-current-location" onChange={this.useCurrent}/>
            <label htmlFor="use-current-location">Use my current location</label>
          </div>
          <div className="query-info">
            <label htmlFor="location"></label>
            {!this.state.useCurrent && 
              <input id="location" placeholder="location" onChange={this.handleChange} />
            }
            <label htmlFor="keywords" /> 
            <input id="keywords" placeholder="keywords" onChange={this.handleChange} />
            <button>Get Events</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
})

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (url) => dispatch(fetchEvents(url)),
  fetchLocation: (location) => dispatch(fetchLocation(location)),
  setLocation: (location) => dispatch(locationFetchSuccess(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingForm);