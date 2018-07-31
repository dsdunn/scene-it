import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { urlBuilder, reverseGeocode } from '../../helper';
import { fetchEvents } from '../../thunks/fetchEvents';
import { fetchLocation } from '../../thunks/fetchLocation';
import { locationFetchSuccess } from '../../actions';
import './BodyForm.css'

export class BodyForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      locationName: '',
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
    this.setState({isLoading:true});
    await this.props.fetchLocation(this.state.locationName);
    const url = urlBuilder({keywords: this.state.keywords, location: this.props.location});
    await this.props.fetchEvents(url);
    this.setState({isLoading: false});
  }

  useCurrent = (event) => {
    const setLocation = async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      await this.props.setLocation({lat, lng})
      const locationName = await reverseGeocode(`${lat},${lng}`);
      this.setState({
        locationName,
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

  goHome = () => {
    this.props.history.goBack();
  }

  render(){
    return (
      <div className="header">
        <span className="body-form-logo" onClick={this.goHome}><a href='#'>Scene-It</a></span>
        <form className="body-form" onSubmit={this.handleSubmit}>
          <div className ="user-select">
            <input type="checkbox" id="use-current-location" onChange={this.useCurrent}/>
            <label htmlFor="use-current-location">Use my current location</label>
          </div>
          <div className="query-info">
            {this.state.useCurrent ?
              <h3 className='user-location' >location: {this.state.locationName}</h3>
            : <input id="locationName" placeholder="location" value= {this.state.locationName} onChange={this.handleChange} />
            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BodyForm));