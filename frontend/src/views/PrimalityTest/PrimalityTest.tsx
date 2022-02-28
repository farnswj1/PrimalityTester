import React, { ChangeEvent, FC, useState } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import PrimalityTestForm from '../../components/PrimalityTestForm';
import PrimalityTestInfo from '../../components/PrimalityTestInfo';
import axios from 'axios';

const PrimalityTest: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<number | null>(null);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);

    let params: string = '';
    const number: string = event.target.number.value.trim();

    if (number) {
      params = `?number=${encodeURIComponent(number)}`;
    }

    const url: string = process.env.REACT_APP_API_URL + 'primality_testing/' + params;
    axios.get(url)
      .then(response => {
        setResult(response.data.result);
        setError(null);
      })
      .catch(error => {
        setResult(null);
        setError(error.response.status);
      });

    setLoading(false);
  }

  return (
    <Box>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Box>
            <Box>
              <PrimalityTestForm handleSubmit={handleSubmit} />
            </Box>
            <Box sx={{ my: 5 }}>
              {
                loading && (
                  <LinearProgress color="success" />
                )
              }
              {
                !loading && error && (
                  <Typography variant="h4" align="center" color="error">
                    Please enter a number.
                  </Typography>
                )
              }
              {
                !loading && result !== null && (
                  <Typography variant="h4" align="center">
                    {result ? 'Prime' : 'Not Prime'}
                  </Typography>
                )
              }
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <PrimalityTestInfo />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PrimalityTest;
