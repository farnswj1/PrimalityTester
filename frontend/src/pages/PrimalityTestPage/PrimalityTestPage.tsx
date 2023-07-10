import { FC, FormEvent, useState } from 'react';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { CustomGrow } from 'components';
import { APIService } from 'services';
import PrimalityTestForm from './PrimalityTestForm';
import PrimalityTestInfo from './PrimalityTestInfo';

const PrimalityTestPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    setResult(null);

    const data = new FormData(event.currentTarget);
    const query = new URLSearchParams(data as any).toString();
    const url: string = `/api/primality_testing/?${query}`;

    APIService.get(url)
      .then(response => {
        setResult(response.data.result);
        setStatus(response.status);
      })
      .catch(error => {
        setStatus(error.response.status);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openHelpModal = (): void => {
    setOpenModal(true);
  };

  const closeHelpModal = (): void => {
    setOpenModal(false);
  };

  return (
    <CustomGrow>
      <Container maxWidth="sm">
        <Box>
          <PrimalityTestForm
            handleSubmit={handleSubmit}
            openModal={openHelpModal}
          />
        </Box>
        <Box textAlign="center" marginY={5}>
          {
            loading && (
              <LinearProgress color="info" />
            )
          }
          {
            status === 400 && (
              <Typography variant="h4" color="error">
                Please enter a number.
              </Typography>
            )
          }
          {
            (status && status >= 500) && (
              <Typography variant="h4" color="error">
                There is an issue with the server!
              </Typography>
            )
          }
          {
            result !== null && (
              <Typography variant="h4">
                {result ? 'Prime' : 'Not Prime'}
              </Typography>
            )
          }
        </Box>
        <Box>
          <PrimalityTestInfo
            open={openModal}
            onClose={closeHelpModal}
          />
        </Box>
      </Container>
    </CustomGrow>
  );
}

export default PrimalityTestPage;
