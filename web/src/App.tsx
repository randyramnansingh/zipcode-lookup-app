import { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SearchHistoryList from './SearchHistoryList';
import SearchForm, { CountryOption } from './SearchForm';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Result, { ResultItem } from './Result';

function App() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [zipcode, setZipcode] = useState('');
  const [result, setResult] = useState<ResultItem>({});

  useEffect(() => {
    const data = window.localStorage.getItem('zipcodelookup_history');
    if ( data !== null ) setSearchHistory(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (searchHistory.length > 0) {
      window.localStorage.setItem('zipcodelookup_history', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  return (
    <div className="App">
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
          >
            Zipcode Lookup Tool
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={{ xs: 2, md: 3 }} >
        <SearchForm
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          zipcode={zipcode}
          setZipcode={setZipcode}
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
          setResult={setResult} />
        <Result result={result} />
        <SearchHistoryList 
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
          setSelectedCountry={setSelectedCountry}
          setZipcode={setZipcode}
          setResult={setResult} />
      </Grid>
    </div>
  );
};

export default App;
