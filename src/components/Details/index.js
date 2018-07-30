import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './Details.css';

export const Details = ({selectedEvent}) => {
  const {
    cityName, 
    performers, 
    postalCode, 
    region, 
    startTime, 
    title, 
    eventUrl, 
    address, 
    venueName, 
    venueUrl,
    image,
    description
  } = selectedEvent || 'unavailable';

  const getBio = () => {
    if (performers) {
      return performers.performer[0] ?
        performers.performer[0].short_bio :
        performers.performer.short_bio ?
        performers.performer.short_bio : '';
    }
  }

  return (
    selectedEvent ?
      <div className="details">
        <img src={image ? image.medium.url : ''}/>
        <div className="details-header">
          <div className='details-header-left'>
            <h1 className="details-title">{title}</h1>
            <p className="details-genre">{getBio()}</p>
          </div>
          <h2 className="details-venue">
            <a target="_blank" href={venueUrl}>{venueName}</a>
          </h2>
          <Moment 
            className="details-start-time"
            date={startTime}
            format="dddd, MMMM Do YYYY, hA"
          /> 
          <div className="address">
            <p>{address}</p>
            <p>{region}, {postalCode}</p>
          </div>
        </div>  
        <p className="event-url">
          <a target="_blank" href={eventUrl}>get tickets</a>
        </p>
        <p className="details-description">{description}</p>
      </div>  
    : <p className='details'>Scroll down from more. Click event for details.</p>
    )
}

