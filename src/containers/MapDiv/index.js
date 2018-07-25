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

  showInfo = (state) => {
    this.props.selectEvent(state.id)
      this.setState({
        infoPosition: state.position,
        currentId: state.id
      })      
   
    console.log(state)
  }

  // hideInfo = () => {
  //   this.setState({
  //     infoPosition: null
  //   })
  //   console.log('hide')
  // }

  markers = () => {
    return this.props.events.map(event => {  
      return (
        <Marker 
        position={{lat: event.lat,lng: event.lng}}
        title={event.title}
        onClick={() => this.showInfo({
          id:event.eventId, 
          position: {lat: event.lat, lng: event.lng}
        })}
        
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
        {this.state.infoPosition && 
          <InfoWindow position={this.state.infoPosition}>
            <h2>{this.state.currentId}</h2>
          </InfoWindow>
        }
      </GoogleMap>
    )
  }
}

const mapStateToProps = (state) => ({
  center: state.location,
  events: state.events,
  selectedEvent: state.selectedEvent
})

const mapDispatchToProps = (dispatch) => ({
  selectEvent: (id) => dispatch(selectEvent(id)),
  unselectEvent: (id) => dispatch(unselectEvent(id))
})

export default withScriptjs(withGoogleMap(connect(mapStateToProps,mapDispatchToProps)(Map)))