import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

const Error404: FC = () => (
  <Box>
    <Grid
      spacing={2}
      justifyContent="center"
      container
    >
      <Grid item xs={6}>
        <Box>
          <Paper square={false} sx={{ p: 2 }}>
            <Typography variant="h5">Page Not Found</Typography>
            <Typography>
              Fun fact: 404 is not prime. Also, this page doesn't exist.
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Link to="/">
            <Button variant="contained">
              Go Home
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Error404;