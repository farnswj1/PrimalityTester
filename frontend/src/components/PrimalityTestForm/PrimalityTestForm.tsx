import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react';
import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';

interface Props {
  handleSubmit: FormEventHandler
};

const PrimalityTestForm: FC<Props> = ({ handleSubmit }) => {
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
    <Paper square={false} sx={{ p: 2 }}>
      <Typography variant="h4">Is It Prime?</Typography>
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
  );
}

export default PrimalityTestForm;
