import * as helper from './helper';
import { apiKey, mapKey } from './apiKey';
import { mockRawEvents } from './mockData';

describe('urlBuilder', () => {
  it('should put together a url with location and keywords', () => {
    const expected = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${apiKey}&keywords=jazz || live+music || comedy&within=20&location=1, 2&within=20&date=This Week&page_size=20`;

    const actual = helper.urlBuilder({location: {lat: 1, lng: 2}, keywords: 'jazz'});

    expect(actual).toEqual(expected);
  });
});

describe('dataCleaner', () => {
  it('should return an object with the expected data', () => {
    const expected = [
    {"address": "1 Depot Square", "cityName": "Englewood", "description": null, "eventId": "E0-001-114220260-3", "eventUrl": "http://denver.eventful.com/events/child-jazz-/E0-001-114220260-3?utm_source=apis&utm_medium=apim&utm_campaign=apic", "image": null, "lat": 39.6478, "lng": -104.987, "performers": null, "postalCode": null, "region": "Colorado", "startTime": "2018-07-10 00:00:00", "title": "Child Jazz", "venueId": "V0-001-012359920-8", "venueName": "The Performing Arts School - Theater", "venueUrl": "http://denver.eventful.com/venues/the-performing-arts-school-theater-/V0-001-012359920-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"},
    {"address": "5300 South Olive Road", "cityName": "Evergreen", "description": null, "eventId": "E0-001-113541732-2", "eventUrl": "http://denver.eventful.com/events/jazz-dance-event-jazz-1-/E0-001-113541732-2?utm_source=apis&utm_medium=apim&utm_campaign=apic", "image": null, "lat": 39.6205219, "lng": -105.3309161, "performers": null, "postalCode": "80439", "region": "Colorado", "startTime": "2018-07-12 00:00:00", "title": "Jazz dance Event - Jazz 1", "venueId": "V0-001-006213160-8", "venueName": "Wulf Recreation Center", "venueUrl": "http://denver.eventful.com/venues/wulf-recreation-center-/V0-001-006213160-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"}
    ];
    const actual = helper.dataCleaner(mockRawEvents);

    expect(actual).toEqual(expected);
  });
});

describe('reverseGeocode', () => {
  it('should call fetch with the correct url', async () => {

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({results:[{address_components:[{types:['locality'],short_name:'JesusH!'}]}]})
      })
    )
    const location = 'Neverland';

    await helper.reverseGeocode(location)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${mapKey}`

    expect(fetch).toBeCalledWith(url)

  })
})





