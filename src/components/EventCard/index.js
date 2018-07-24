import React from 'react';

export const EventCard = ({event}) => {
  return (
    <div id={event.id}>
      <h4>{event.title}</h4>
      <p>{event.venueName}</p>
      <p>{event.address}</p> 
      <p>{event.cityName}, {event.region} {event.postalCode}</p>
    </div>
    )
}