import {apiKey} from './apiKey';

export const urlBuilder = (state) => {
  let { location } = state;
  const keywords = state.keywords.length ? `keywords=tag:${state.keywords} || live+music || comedy&within=20` : 'keywords=live+music || comedy';
  if (typeof location != 'string') {
    location = location.lat + ', ' + location.lng;
    console.log(location)
  }
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

  return `${corsAnywhereUrl}http://api.eventful.com/json/events/search?app_key=${apiKey}&${keywords}&location=${location}&within=20&date=This Week&page_size=20`;
};

export const dataCleaner = (events) => {
  return events.map(event => ({
    cityName: event.city_name,
    eventId: event.id,
    lat: parseFloat(event.latitude),
    lng: parseFloat(event.longitude),
    performers: event.performers,
    postalCode: event.postal_code,
    region: event.region_name,
    startTime: event.start_time,
    title: event.title,
    description: event.description,
    eventUrl: event.url,
    address: event.venue_address,
    venueId: event.venue_id,
    venueName: event.venue_name,
    venueUrl: event.venue_url,
    image: event.image
  }))
}