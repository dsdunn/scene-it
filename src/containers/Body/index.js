import React from 'react';
import { connect } from 'react-redux';
import { EventCard } from '../../components/EventCard';
import  Map  from '../MapDiv';
import { mapKey } from '../../apiKey';

const Body = (props) => {

  const eventList = () => props.events.map(event => <EventCard event={event}/>)

  return (
    <div className="Body">
      <div className="event-list">
        {eventList()}
      </div>
      <div className="map-div">
        <Map 
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <div className="details">
      </div>
    </div>
  );
}

export const mapStateToProps = (state) => ({
  events: state.events
})

export default connect(mapStateToProps)(Body);