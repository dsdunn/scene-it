import React from 'react';
import Moment from 'react-moment';

export const EventCard = ({event, selectEvent, selectedEvent, label}) => {
  const handleClick = () => {
    selectEvent(event);
  }
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter = labels[label];
  const isSelected = () => {
    if (selectedEvent) {
      return selectedEvent.eventId === event.eventId;
    }
  }

  return (
    <div 
      className={`event-card ${isSelected() ? 'selected' : ''}`}
      id={event.eventId} 
      onClick={handleClick}
    >
      <h3 className='card-label'>{letter}</h3>
      <h4 className="card-title">{event.title}</h4>
      <h5 className="date">
        <Moment format="ddd MMM Do" date={event.startTime} />
      </h5>
      <p className="card-venue">{event.venueName}</p>
    </div>
    )
}