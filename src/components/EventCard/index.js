import React from 'react';

export const EventCard = ({event, selectEvent}) => {
  const handleClick = () => {
    selectEvent(event);
  }
  return (
    <div className="event-card" id={event.id} onClick={handleClick}>
      <h4 className="card-title">{event.title}</h4>
      <p className="card-venue">{event.venueName}</p>
    </div>
    )
}