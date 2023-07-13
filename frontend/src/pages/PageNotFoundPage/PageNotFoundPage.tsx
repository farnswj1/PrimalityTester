import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { CustomGrow, CustomPaper } from 'components';

const PageNotFoundPage: FC = () => (
  <CustomGrow>
    <Container maxWidth="sm">
      <Box justifyContent="center" alignItems="center" textAlign="center">
        <Box marginBottom={3}>
          <CustomPaper>
            <Typography variant="h5">
              Page Not Found
            </Typography>
            <Typography>
              Fun fact: 404 is not prime. Also, this page doesn't exist.
            </Typography>
          </CustomPaper>
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
