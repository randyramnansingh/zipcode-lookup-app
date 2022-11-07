export const typeDef = `#graphql

  type Place {
    placeName: String
    longitude: String
    state: String
    stateAbbreviation: String
    latitude: String
  }

  type Zipcode {
    postCode: String
    country: String
    countryAbbreviation: String
    places: [Place]
  }

  extend type Query {
    zipcode(countryCode: String!, zipcode: String!): Zipcode
  }
`;
