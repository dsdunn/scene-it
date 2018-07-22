import React from 'react';
import { connect } from 'react-redux';
import { EventCard } from '../EventCard';

const Body = (props) => {
  return props.events.map(event => <EventCard key={event.id} event={event}/>)
  
}

export const mapStateToProps = (state) => ({
  events: state.events
})

export default connect(mapStateToProps)(Body);