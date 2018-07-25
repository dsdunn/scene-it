import React from 'react';

export const EventCard = ({event, selectEvent}) => {
  return (
    <div className="event-card" id={event.id} onClick={() => selectEvent(event)}>
      <h4 className="card-title">{event.title}</h4>
      <p className="card-venue">{event.venueName}</p>
    </div>
    )
}