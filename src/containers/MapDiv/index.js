import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class Map extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { lat, lng } = this.props.coordinates
    return(
      <GoogleMap 
        defaultZoom={12}
        defaultCenter={{lat, lng}}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  coordinates: state.location
})

export default withScriptjs(withGoogleMap(connect(mapStateToProps)(Map)))