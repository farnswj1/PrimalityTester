import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { CustomGrow } from 'components';

const PageNotFoundPage: FC = () => (
  <CustomGrow>
    <Container maxWidth="sm">
      <Box justifyContent="center" alignItems="center" textAlign="center">
        <Box marginBottom={3}>
          <Paper square={false} sx={{ p: 2 }}>
            <Typography variant="h5">
              Page Not Found
            </Typography>
            <Typography>
              Fun fact: 404 is not prime. Also, this page doesn't exist.
            </Typography>
          </Paper>
        </Box>
        <Box>
          <Link to="/">
            <Button variant="contained">
              Go Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  </CustomGrow>
);

export default PageNotFoundPage;
