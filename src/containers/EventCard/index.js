import React from 'react';

export const EventCard = ({event}) => {
  return (
    <div id={event.id}>
      <h4>{event.title}</h4>
      <p>{event.location}</p>
    </div>
    )
}