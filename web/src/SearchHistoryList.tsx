import { Button, Card, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ResultItem } from './Result';
import { SearchInput } from './SearchForm';

type SearchHistoryItem = SearchInput & {result: ResultItem;};

type SearchHistoryProps = {
  searchHistory: SearchHistoryItem[];
  setSearchHistory: Function;
  setSelectedCountry: Function;
  setZipcode: Function;
  setResult: Function;
};

function SearchHistoryList(props: SearchHistoryProps) {

  const clickHandler = (i: number) => {
    const historyItem = props.searchHistory[i];
    if (!!historyItem) {
      props.setSelectedCountry(historyItem.country);
      props.setZipcode(historyItem.zipcode);
      props.setResult(historyItem.result);
    } 
  };

  const clearHistoryButtonHandler = () => {
    props.setSearchHistory([]);
    window.localStorage.removeItem('zipcodelookup_history');
  }

  const renderSearchHistory = props.searchHistory.map((searchRecord, i) => 
        <ListItem disablePadding key={i} onClick={() => clickHandler(i)} divider>
          <ListItemButton>
            <ListItemText primary={`Country: ${searchRecord.country.label} | Zipcode: ${searchRecord.zipcode} | State: ${searchRecord.result.state} | City: ${searchRecord.result.city}`} />
          </ListItemButton>
        </ListItem>
  );
  
  return (
    <Grid item xs={12} sm={12} md={4}>
      <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
        <Typography
          variant="h6"
          component="div"
        >
          Last 5 Searches
        </Typography>
        <List>
          {renderSearchHistory}
          {props.searchHistory.length === 0 &&
            <ListItem disablePadding divider>
              <ListItemButton>
                <ListItemText primary="No previous searches available" />
              </ListItemButton>
            </ListItem>
          }
        </List>
        {props.searchHistory.length > 0 &&
          <Button
            onClick={clearHistoryButtonHandler}
            variant="contained"
            fullWidth
          >
            Clear history
          </Button>
        }
      </Card>
    </Grid>
  );
}

export default SearchHistoryList;
