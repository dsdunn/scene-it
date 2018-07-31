import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EventCard } from '../../components/EventCard';
import  Map  from '../MapDiv';
import { mapKey } from '../../apiKey';
import './Body.css';
import { selectEvent } from '../../actions';
import { Details } from '../../components/Details';
import BodyForm from '../BodyForm';

export class Body extends Component {
  constructor() {
    super();
  }

  eventList = () => this.props.events.map((event, index) => <EventCard event={event} selectEvent={this.props.selectEvent} selectedEvent={this.props.selectedEvent} label={index} />)

  render() {
    return (
      <div className="main-body">
        <BodyForm/>
        <div className="map-div">
          <div className="event-list">
            {this.eventList()}
          </div>
          <Map 
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `60vh`, width: '50%', margin: '2%' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <Details selectedEvent={this.props.selectedEvent}/>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.events,
  selectedEvent: state.selectedEvent
})

export const mapDispatchToProps = (dispatch) => ({
  selectEvent: (event) => dispatch(selectEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Body);