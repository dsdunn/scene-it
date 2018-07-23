import {apiKey} from './apiKey';

export const urlBuilder = (state) => {
  const { location, keywords } = state;
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'
  return `${corsAnywhereUrl}http://api.eventful.com/json/events/search?app_key=${apiKey}&keywords=${keywords}&location=${location}&date=Today`;
};

export const dataCleaner = (events) => {
  return events.map(event => ({
    cityName: event.city_name,
    eventId: event.id,
    latitude: event.latitude,
    longitude: event.longitude,
    performers: event.performers,
    postalCode: event.postal_code,
    region: event.region_name,
    startTime: event.start_time,
    title: event.title,
    eventUrl: event.url,
    address: event.venue_address,
    venueId: event.venue_id,
    venueName: event.venue_name,
    venueUrl: event.venue_url
  }))
}