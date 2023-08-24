import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import { CustomGrow, CustomPaper } from 'components';

const PageNotFoundPage: FC = () => (
  <CustomGrow>
    <Container maxWidth="sm">
      <Stack
        spacing={3}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <CustomPaper>
          <Typography variant="h5">
            Page Not Found
          </Typography>
          <Typography>
            Fun fact: 404 is not prime. Also, this page doesn't exist.
          </Typography>
        </CustomPaper>
        <Link to="/">
          <Button variant="contained">
            Go Home
          </Button>
        </Link>
      </Stack>
    </Container>
  </CustomGrow>
);

export default PageNotFoundPage;
