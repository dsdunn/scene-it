import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LandingForm.css'

import { urlBuilder, reverseGeocode } from '../../helper';
import { fetchEvents } from '../../thunks/fetchEvents';
import { fetchLocation } from '../../thunks/fetchLocation';
import { locationFetchSuccess } from '../../actions';

export class LandingForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
      keywords: '',
      useCurrent: false,
      isLoading: false
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
      this.setState({isLoading:true});
      await this.props.fetchLocation(this.state.location);
    }
    const url = urlBuilder({...this.state, location: this.props.location});
    await this.props.fetchEvents(url);
    this.setState({isLoading: false});
    this.props.history.push('/results');
  }

  useCurrent = (event) => {
    const setLocation = async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      // const coords = {lat, lng};
      await this.props.setLocation({lat, lng})
      const locationName = await reverseGeocode(`${lat},${lng}`);
      console.log(locationName)
      this.setState({
        location: this.props.location,
        isLoading: false
      })
    }
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
      this.setState({
        useCurrent: !this.state.useCurrent,
        isLoading: true
      })
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}className="landing-form">
        <header className="App-header">
          <h1 className="App-title">Scene-It</h1>
          <h5 className="header-description">
            Enter your location or click "use my location" to find out what's happening in your scene this week!
          </h5>
        </header>
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
            <input id="keywords" placeholder="keywords (optional)" onChange={this.handleChange} />
            {this.state.isLoading ? `loading...` : <button>Get Events</button> }
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