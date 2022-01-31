import React, { useState } from 'react';
import { Grid, Box, Typography, LinearProgress } from '@mui/material';
import PrimalityTestForm from '../../components/PrimalityTestForm';
import PrimalityTestInfo from '../../components/PrimalityTestInfo';
import axios from 'axios';

const PrimalityTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let params = '';
    const number = event.target.number.value;

    if (number) {
      params = `?number=${encodeURIComponent(number)}`;
    }

    const url = process.env.REACT_APP_API_URL + 'primality_testing/' + params;
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
                !loading && error !== null && (
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
