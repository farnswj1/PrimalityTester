import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { CustomGrow, CustomPaper } from 'components';
import { setTitle } from 'utils';

const PageNotFoundPage: FC = () => {
  setTitle('Page Not Found');

  return (
    <CustomGrow>
      <Container maxWidth="md">
        <Stack
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <CustomPaper>
            <Typography variant="h4">
              Page Not Found
            </Typography>
            <Typography paragraph>
              Fun fact: 404 is not prime. Also, it's a code for "this page doesn't exist".
            </Typography>
            <Box marginTop={3}>
              <Button component={Link} variant="contained" to="/">
                Go Home
              </Button>
            </Box>
          </CustomPaper>
        </Stack>
      </Container>
    </CustomGrow>
  );
};

export default PageNotFoundPage;
