import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PrimalityTestForm from '../../components/PrimalityTestForm';
import axios from 'axios';

const PrimalityTest = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let params = '';
    const number = event.target.number.value;

    if (number) {
      params = `?number=${encodeURIComponent(number)}`
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
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>Primality Test Page</Typography>
      <PrimalityTestForm handleSubmit={handleSubmit} />
      {
        error !== null && (
          <Typography color="red">Please enter a number.</Typography>
        )
      }
      {
        result !== null && (
          <Typography>{result ? 'Prime' : 'Not Prime'}</Typography>
        )
      }
    </Box>
  );
}

export default PrimalityTest;
