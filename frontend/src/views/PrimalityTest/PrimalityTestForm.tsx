import React, { ChangeEvent, FC, FormEventHandler, Fragment, MouseEventHandler, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

interface Props {
  handleSubmit: FormEventHandler,
  openModal: MouseEventHandler
};

const PrimalityTestForm: FC<Props> = ({ handleSubmit, openModal }) => {
  const [error, setError] = useState<boolean>(false);
  const [formChanged, setFormChanged] = useState<boolean>(false);

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const number: string = event.target.value.trim();
    const intRegex: RegExp = /^([2-9]|[1-9][0-9]+)$/;
    setError(!intRegex.test(number));

    if (!formChanged) {
      setFormChanged(true);
    }
  };

  return (
    <Fragment>
      <Paper square={false} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4">
              Is It Prime? 
            </Typography>
          </Box>   
          <Box>
            <Tooltip title="Click this icon for more information on primes.">
              <IconButton onClick={openModal}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="number"
              label="Enter an integer greater than 1"
              multiline={true}
              rows={8}
              sx={{ my: 3 }}
              required
              InputLabelProps={{ required: false }}
              onChange={handleNumberChange}
              error={error}
            />
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={error || !formChanged}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Fragment>
  );
}

export default PrimalityTestForm;
