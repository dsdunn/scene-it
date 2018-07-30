import React from 'react';
import Moment from 'react-moment';
import './EventCard.css';

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
      <div className='card-label'><div className="circle">{letter}</div></div>
      <div className='card-info'>
        <h4 className="card-title">{event.title}</h4>
        <p className="card-venue">{event.venueName}</p>
      </div>
      <h5 className="date">
        <Moment format="ddd" date={event.startTime} />
      </h5>
    </div>
    )
}