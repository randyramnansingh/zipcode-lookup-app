import { getZipcode } from './data.js';

export default class Zipcode {
  static getZipcode(countryCode: String, zipcode: String) {
    return getZipcode(countryCode, zipcode);
  }
};
