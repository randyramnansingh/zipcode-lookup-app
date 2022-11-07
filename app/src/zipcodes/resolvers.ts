import Zipcode from './Zipcode.js';

export const resolvers = {
  Query: {
    zipcode: (parent: any, { countryCode, zipcode }: any) => Zipcode.getZipcode(countryCode, zipcode),
  },
};
