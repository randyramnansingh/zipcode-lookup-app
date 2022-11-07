import humps from 'humps';
const { camelizeKeys } = humps;

export const getZipcode = async (countryCode: String, zipcode: String) => {
  const res = await fetch(`http://api.zippopotam.us/${countryCode}/${zipcode}`);
  if (res.ok) {
    const data = await res.json();
    return camelizeKeys(data);
  }
  // TODO: Add error handling
}