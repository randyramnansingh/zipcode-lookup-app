import { expect, it } from '@jest/globals';
import { ApolloServer } from "@apollo/server";
import assert from 'assert';

// data.ts
import humps from 'humps';
const { camelizeKeys } = humps;

export const getZipcode = async (countryCode: String, zipcode: String) => {
  const res = await fetch(`http://api.zippopotam.us/${countryCode}/${zipcode}`);
  if (res.ok) {
    const data = await res.json();
    return camelizeKeys(data);
  }
}

// Zipcode.ts
export default class Zipcode {
  static getZipcode(countryCode: String, zipcode: String) {
    return getZipcode(countryCode, zipcode);
  }
};

const typeDefs = `#graphql
    type Query
  `;

const typeDef = `#graphql
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


const resolvers = {
  Query: {
    zipcode: (parent: any, { countryCode, zipcode }: any) => Zipcode.getZipcode(countryCode, zipcode),
  },
};


it('returns hello with the provided name', async () => {
  const testServer = new ApolloServer({
    typeDefs: [typeDefs, typeDef],
    resolvers,
  });

  const query = `#graphql
    query Query($countryCode: String!, $zipcode: String!) {
      zipcode(countryCode: $countryCode, zipcode: $zipcode) {
        places {
          placeName
          state
        }
      }
    }
  `;

  const response = await testServer.executeOperation({
    query,
    variables: { countryCode: 'US', zipcode: '90210' },
  });

  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.zipcode).toEqual({places: [{placeName: 'Beverly Hills', state: 'California'}]});
});