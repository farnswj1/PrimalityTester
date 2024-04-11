import { FC, FormEvent, useState } from 'react';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { CustomGrow } from 'components';
import { APIService } from 'services';
import { setTitle } from 'utils';
import PrimalityTestForm from './PrimalityTestForm';
import PrimalityTestInfo from './PrimalityTestInfo';

const PrimalityTestPage: FC = () => {
  setTitle();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    setResult(null);

    const data: FormData = new FormData(event.currentTarget);
    const params: URLSearchParams = new URLSearchParams(data as unknown as Record<string, string>);
    params.set('number', params.get('number')!.trim());

    const query: string = params.toString();
    const url: string = `/api/primality_testing/?${query}`;

    APIService.get(url)
      .then(response => {
        setResult(response.data);
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
        <PrimalityTestForm
          handleSubmit={handleSubmit}
          openModal={openHelpModal}
          disabled={loading}
        />
        <Box textAlign="center" marginY={5}>
          {
            loading && (
              <LinearProgress color="info" />
            )
          }
          {
            status === 400 && (
              <Typography variant="h5" color="error">
                Please enter a number.
              </Typography>
            )
          }
          {
            status === 429 && (
              <Typography variant="h5" color="error">
                Max limit exceeded! Please wait 1 minute.
              </Typography>
            )
          }
          {
            (status && status >= 500) && (
              <Typography variant="h5" color="error">
                There is an issue with the server!
              </Typography>
            )
          }
          {
            result !== null && (
              <Typography variant="h5">
                {result ? 'Prime' : 'Not Prime'}
              </Typography>
            )
          }
        </Box>
        <PrimalityTestInfo
          open={openModal}
          onClose={closeHelpModal}
        />
      </Container>
    </CustomGrow>
  );
}

export default PrimalityTestPage;
