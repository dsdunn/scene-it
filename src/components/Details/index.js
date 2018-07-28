import React from 'react';
import { connect } from 'react-redux';

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

  return (
    selectedEvent &&
      <div className="details">
        <img src={image.medium.url}/>
        <h1 className="details-title">{title}</h1>
        <p className="details-genre">{performers.performer[0].short_bio}</p>
        <h2 className="details-start-time">{startTime}</h2>
        <a href={venueUrl}>
          <h2 className="details-venue">{venueName}</h2>
        </a>
        <div className="details-address"> 
          <p className="streetAddress">{address}</p>
          <p className="city">{region}, {postalCode}</p>
        </div>
        <p className="details-description">{description}</p>
        <a href={eventUrl}>
          <p className="event-url">more information</p>
        </a>
      </div>  
    )
}

// export const mapStateToProps = (state) => ({
//   selectedEvent: state.selectedEvent
// })

// export default connect(mapStateToProps)(Details);