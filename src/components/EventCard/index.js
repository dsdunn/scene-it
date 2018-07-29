import React from 'react';
import Moment from 'react-moment';

export const EventCard = ({event, selectEvent}) => {
  const handleClick = () => {
    selectEvent(event);
  }
  return (
    <div className="event-card" id={event.id} onClick={handleClick}>
      <h4 className="card-title">{event.title}</h4>
      <h5 className="date">
        <Moment format="ddd MMM Do" date={event.startTime} />
      </h5>
      <p className="card-venue">{event.venueName}</p>
    </div>
    )
}