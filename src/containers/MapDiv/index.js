import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class Map extends Component {
  constructor(props){
    super(props);
  }

  showInfo = (id) => {
    console.log(id)
  }

  markers = () => {
    return this.props.events.map(event => {  
      return (
        <Marker 
        position={{lat: event.lat,lng: event.lng}}
        title={event.title}
        onMouseOver={()=>this.showInfo(event.eventId)}

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