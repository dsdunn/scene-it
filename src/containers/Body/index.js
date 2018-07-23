import React from 'react';
import { connect } from 'react-redux';
import { EventCard } from '../EventCard';

const Body = (props) => {

  const eventList = () => props.events.map(event => <EventCard event={event}/>)

  return (
    <div className="Body">
      <div className="event-list">
        {eventList()}
      </div>
      <div className="map-div">
      </div>
      <div className="details">
      </div>
    </div>
    )
}

export const mapStateToProps = (state) => ({
  events: state.events
})

export default connect(mapStateToProps)(Body);