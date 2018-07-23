import * as helper from './helper';
import { apiKey } from './apiKey';
import { mockRawEvents } from './mockData';

describe('urlBuilder', () => {
  it('should put together a url with location and keywords', () => {
    const expected = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${apiKey}&keywords=jazz&location=Denver&date=Today`;
    const actual = helper.urlBuilder({location: 'Denver', keywords: 'jazz'});

    expect(actual).toEqual(expected);
  });
});

describe('dataCleaner', () => {
  it('should return an object with the expected data', () => {
    const expected =     [ { cityName: 'Englewood',
      eventId: 'E0-001-114220260-3',
      latitude: '39.6478',
      longitude: '-104.987',
      performers: null,
      postalCode: null,
      region: 'Colorado',
      startTime: '2018-07-10 00:00:00',
      title: 'Child Jazz',
      eventUrl: 'http://denver.eventful.com/events/child-jazz-/E0-001-114220260-3?utm_source=apis&utm_medium=apim&utm_campaign=apic',
      address: '1 Depot Square',
      venueId: 'V0-001-012359920-8',
      venueName: 'The Performing Arts School - Theater',
      venueUrl: 'http://denver.eventful.com/venues/the-performing-arts-school-theater-/V0-001-012359920-8?utm_source=apis&utm_medium=apim&utm_campaign=apic' },
    { cityName: 'Evergreen',
      eventId: 'E0-001-113541732-2',
      latitude: '39.6205219',
      longitude: '-105.3309161',
      performers: null,
      postalCode: '80439',
      region: 'Colorado',
      startTime: '2018-07-12 00:00:00',
      title: 'Jazz dance Event - Jazz 1',
      eventUrl: 'http://denver.eventful.com/events/jazz-dance-event-jazz-1-/E0-001-113541732-2?utm_source=apis&utm_medium=apim&utm_campaign=apic',
      address: '5300 South Olive Road',
      venueId: 'V0-001-006213160-8',
      venueName: 'Wulf Recreation Center',
      venueUrl: 'http://denver.eventful.com/venues/wulf-recreation-center-/V0-001-006213160-8?utm_source=apis&utm_medium=apim&utm_campaign=apic' } ];
    const actual = helper.dataCleaner(mockRawEvents);

    expect(actual).toEqual(expected);
  });
});