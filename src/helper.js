import {apiKey, mapKey} from './apiKey';

export const urlBuilder = ({location, keywords}) => {
  const words = keywords.length ? `keywords=${keywords} || live+music || comedy&within=20` : 'keywords=live+music || comedy';
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

  return `${corsAnywhereUrl}http://api.eventful.com/json/events/search?app_key=${apiKey}&${words}&location=${location.lat}, ${location.lng}&within=20&date=This Week&page_size=20`;
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

export const reverseGeocode = async (location) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${mapKey}`
  const response = await fetch(url);
  const result = await response.json();
  const locality = result.results[0].address_components.find(component => component.types.includes("locality"));
  return locality.short_name;
}