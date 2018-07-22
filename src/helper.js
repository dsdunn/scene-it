import {apiKey} from './apiKey';

export const urlBuilder = (state) => {
  const { location, keywords } = state;
  return `http://api.eventful.com/json/events/search?app_key=${apiKey}&keywords=${keywords}&location=${location}&date=Today`;
};