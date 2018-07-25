import React from 'react';
import { connect } from 'react-redux';

export const Details = (props) => {
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
    venueUrl
  } = props.selectedEvent ? props.selectedEvent : 'shit';

  return (
      <div className="details">
        <h1 className="details-title">{title}</h1>
        <a href={venueUrl}>
          <h2 className="details-venue">{venueName}</h2>
        </a>
        <div className="details-address"> 
          <p className="streetAddress">{address}</p>
          <p className="city">{region}, {postalCode}</p>
        </div>
      </div>
    )
}

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent
})

export default connect(mapStateToProps)(Details);