import React, { ChangeEvent, FC, useState } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import CustomGrow from 'components/CustomGrow';
import PrimalityTestForm from './PrimalityTestForm';
import PrimalityTestInfo from './PrimalityTestInfo';
import axios from 'axios';

const PrimalityTest: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const openHelpModal = (): void => {
    setOpenModal(true);
  };

  const closeHelpModal = (): void => {
    setOpenModal(false);
  };

  return (
    <CustomGrow>
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Box>
              <Box>
                <PrimalityTestForm handleSubmit={handleSubmit} openModal={openHelpModal} />
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
        </Grid>
        <Box>
          <PrimalityTestInfo open={openModal} onClose={closeHelpModal} />
        </Box>
      </Box>
    </CustomGrow>
  );
}

export default PrimalityTest;
