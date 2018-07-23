import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <GoogleMap 
        defaultZoom={8}
        defaultCenter={{lat: -34.397, lng: 150.644}}
      />
    )
  }
}

export default withScriptjs(withGoogleMap(Map))