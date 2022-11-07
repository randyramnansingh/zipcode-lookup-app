import { Card, Grid, Typography } from '@mui/material';

export type ResultItem = {
  state?: string;
  city?: string;
};

type ResultProps = {
  result: ResultItem;
};

function Result(props: ResultProps) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
        <Typography
          variant="h6"
          component="div"
        >
          Result
        </Typography>
        {(!!props.result?.state && !!props.result?.city) ?
          <Card variant="outlined">
            <pre>State: {props.result.state}</pre>
            <pre>City: {props.result.city}</pre>
          </Card>
        :
          <Typography>No result found.</Typography>
        }
      </Card>
    </Grid>
  );
};

export default Result;
