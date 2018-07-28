import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { selectEvent, unselectEvent } from '../../actions';


class Map extends Component {
  constructor(props){
    super(props);
    this.state={
      infoPosition: null,
      currentId: null
    }
  }

  showInfo = (event) => {
    if (event.eventId === this.props.selectedEvent) {
      this.props.unselectEvent(); 
    } else {
      this.props.selectEvent(event);
    }
  }

  markers = () => {
    return this.props.events.map(event => {  
      return (
        <Marker 
        position={{lat: event.lat,lng: event.lng}}
        title={event.title}
        onClick={() => this.showInfo( event
        )}
        
        />
      )
    })
  }

  render(){
    const { lat, lng } = this.props.center
    return lat ?
      <GoogleMap 
        defaultZoom={12}
        defaultCenter={{lat, lng}}
      >
        {this.markers()}
        {this.props.selectedEvent && 
          <InfoWindow position={{lat: this.props.selectedEvent.lat, lng: this.props.selectedEvent.lng}}>
            <h2>{this.props.selectEvent.title}</h2>
          </InfoWindow>
        }
      </GoogleMap>
    : <div></div>
  }
}

const mapStateToProps = (state) => ({
  center: state.location,
  events: state.events,
  selectedEvent: state.selectedEvent
})

const mapDispatchToProps = (dispatch) => ({
  selectEvent: (id) => dispatch(selectEvent(id)),
  unselectEvent: () => dispatch(unselectEvent())
})

export default withScriptjs(withGoogleMap(connect(mapStateToProps,mapDispatchToProps)(Map)))