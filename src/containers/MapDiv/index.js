import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { selectEvent, unselectEvent } from '../../actions';


export class Map extends Component {
  constructor(props){
    super(props);
    this.state={
      infoPosition: null,
      currentId: null,
      infoText: null,
    }
  }

  componentDidMount() {
    const {lat, lng} = this.props.center;
    this.setState({
      lat,lng
    })
  }

  componentWillReceiveProps(nextProps) {
    const {lat, lng} = nextProps.center;
    this.setState({
      lat, lng
    })
  }

  showInfo = (event) => {
    if (event.eventId === this.props.selectedEvent) {
      this.props.unselectEvent(); 
    } else {
      this.props.selectEvent(event);
      this.setState({
        infoText: this.props.selectedEvent.title
      })
    }
  }

  markers = () => {
    const uniqueVenues = [];

    return <MarkerClusterer
      averageCenter
      zoomOnClick
      enableRetinaIcons
      gridSize={20}
      >
      {
      this.props.events.map((event, index) => { 
        if (!uniqueVenues.includes(event.venueId)) {
          uniqueVenues.push(event.venueId);
          const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          const label = labels[index];
          return (
              <Marker 
              position={{lat: event.lat,lng: event.lng}}
              title={event.title}
              label={label}
              onClick={() => this.showInfo(event)}
              />
            )
          }     
        })
      }
    </MarkerClusterer>
  }

  render(){
    const { lat, lng } = this.state;

    return lat ?
      <GoogleMap 
        zoom={10}
        center={{lat, lng}}
      >
        {this.markers()}
        {this.props.selectedEvent && 
          <InfoWindow position={{lat: this.props.selectedEvent.lat, lng: this.props.selectedEvent.lng}}>
            <p className="infoText">{this.props.selectedEvent.venueName}</p>
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