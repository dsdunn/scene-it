import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class Map extends Component {
  constructor(props){
    super(props);
  }

  markers = () => {
    return this.props.events.map(event => {  
      console.log(event)
      return (
        <Marker 
        position={{lat: event.lat,lng: event.lng}}
        
        />
        )
    })
  }

  render(){
    const { lat, lng } = this.props.center
    return(
      <GoogleMap 
        defaultZoom={12}
        defaultCenter={{lat, lng}}
      >
        {this.markers()}
        <Marker position={{lat, lng}}/>
      </GoogleMap>
    )
  }
}

const mapStateToProps = (state) => ({
  center: state.location,
  events: state.events
})

export default withScriptjs(withGoogleMap(connect(mapStateToProps)(Map)))