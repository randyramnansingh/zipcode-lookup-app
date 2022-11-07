import { Autocomplete, Card, Grid, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEventHandler, SyntheticEvent, useState } from 'react';
import fetchGql from './fetchGql';

export type CountryOption = {
  label: string;
  value: string;
};

const countryOptions: CountryOption[] = [
  {label: 'Andorra',	value: 'AD'},
  {label: 'Argentina',	value: 'AR'},
  {label: 'American Samoa',	value: 'AS'},
  {label: 'Austria',	value: 'AT'},
  {label: 'Australia',	value: 'AU'},
  {label: 'Bangladesh',	value: 'BD'},
  {label: 'Belgium',	value: 'BE'},
  {label: 'Bulgaria',	value: 'BG'},
  {label: 'Brazil',	value: 'BR'},
  {label: 'Canada',	value: 'CA'},
  {label: 'Switzerland',	value: 'CH'},
  {label: 'Czech Republic',	value: 'CZ'},
  {label: 'Germany',	value: 'DE'},
  {label: 'Denmark',	value: 'DK'},
  {label: 'Dominican Republic',	value: 'DO'},
  {label: 'Spain',	value: 'ES'},
  {label: 'Finland',	value: 'FI'},
  {label: 'Faroe Islands',	value: 'FO'},
  {label: 'France',	value: 'FR'},
  {label: 'Great Britain',	value: 'GB'},
  {label: 'French Guyana',	value: 'GF'},
  {label: 'Guernsey',	value: 'GG'},
  {label: 'Greenland',	value: 'GL'},
  {label: 'Guadeloupe',	value: 'GP'},
  {label: 'Guatemala',	value: 'GT'},
  {label: 'Guam',	value: 'GU'},
  {label: 'Guyana',	value: 'GY'},
  {label: 'Croatia',	value: 'HR'},
  {label: 'Hungary',	value: 'HU'},
  {label: 'Isle of Man',	value: 'IM'},
  {label: 'India',	value: 'IN'},
  {label: 'Iceland',	value: 'IS'},
  {label: 'Italy',	value: 'IT'},
  {label: 'Jersey',	value: 'JE'},
  {label: 'Japan',	value: 'JP'},
  {label: 'Liechtenstein',	value: 'LI'},
  {label: 'Sri Lanka',	value: 'LK'},
  {label: 'Lithuania',	value: 'LT'},
  {label: 'Luxembourg',	value: 'LU'},
  {label: 'Monaco',	value: 'MC'},
  {label: 'Moldavia',	value: 'MD'},
  {label: 'Marshall Islands',	value: 'MH'},
  {label: 'Macedonia',	value: 'MK'},
  {label: 'Northern Mariana Islands',	value: 'MP'},
  {label: 'Martinique',	value: 'MQ'},
  {label: 'Mexico',	value: 'MX'},
  {label: 'Malaysia',	value: 'MY'},
  {label: 'Holland',	value: 'NL'},
  {label: 'Norway',	value: 'NO'},
  {label: 'New Zealand',	value: 'NZ'},
  {label: 'Phillippines',	value: 'PH'},
  {label: 'Pakistan',	value: 'PK'},
  {label: 'Poland',	value: 'PL'},
  {label: 'Saint Pierre and Miquelon',	value: 'PM'},
  {label: 'Puerto Rico',	value: 'PR'},
  {label: 'Portugal',	value: 'PT'},
  {label: 'French Reunion',	value: 'RE'},
  {label: 'Russia',	value: 'RU'},
  {label: 'Sweden',	value: 'SE'},
  {label: 'Slovenia',	value: 'SI'},
  {label: 'Svalbard & Jan Mayen Islands',	value: 'SJ'},
  {label: 'Slovak Republic',	value: 'SK'},
  {label: 'San Marino',	value: 'SM'},
  {label: 'Thailand',	value: 'TH'},
  {label: 'Turkey',	value: 'TR'},
  {label: 'United States',	value: 'US'},
  {label: 'Vatican',	value: 'VA'},
  {label: 'Virgin Islands',	value: 'VI'},
  {label: 'Mayotte',	value: 'YT'},
  {label: 'South Africa',	value: 'ZA'}
];

const defaultOption = {label: 'United States',	value: 'US'};

export type SearchInput = {
  country: CountryOption;
  zipcode: string;
};

type SearchFormProps = {
  selectedCountry: CountryOption | null;
  setSelectedCountry: Function;
  zipcode: string;
  setZipcode: Function;
  searchHistory: SearchInput[];
  setSearchHistory: Function;
  setResult: Function;
};

function SearchForm(props: SearchFormProps)  {
  const onCountryChange = (e: SyntheticEvent, value: CountryOption | null) => {
    if (value) props.setSelectedCountry(value);
  };

  const onZipcodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.setZipcode(e.currentTarget.value);
  };

  const validInput: boolean = (!!props.selectedCountry && props.zipcode !== '');

  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    setLoading(true);
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
    const variables = {
      countryCode: props.selectedCountry?.value,
      zipcode: props.zipcode
    };
    const result = await fetchGql(query, variables);
    if (result.data?.zipcode && result.data.zipcode.places.length > 0) {
      const {placeName, state} = result.data.zipcode.places[0];
      const resultObj = {
        state,
        city: placeName
      };
      props.setResult(resultObj);
      props.setSearchHistory([
        {country: props.selectedCountry, zipcode: props.zipcode, result: resultObj},
        ...props.searchHistory.slice(0, 4),
      ]);
    } else {
      props.setResult({});
    }
    setLoading(false);
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
        <Typography
          variant="h6"
          component="div"
        >
          Search
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} >
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="country-selector"
              options={countryOptions}
              onChange={onCountryChange}
              value={props.selectedCountry}
              defaultValue={defaultOption}
              renderInput={(params) => <TextField {...params} label="Country" />} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="zipcode-form-field"
              label="Zipcode"
              type="search"
              onChange={onZipcodeChange}
              value={props.zipcode}
              fullWidth
              required />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              disabled={!validInput}
              onClick={getResult}
              loading={loading}
              loadingPosition="end"
              endIcon={<SearchIcon />}
              variant="contained"
              fullWidth
            >
              Look up zipcode
            </LoadingButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default SearchForm;
