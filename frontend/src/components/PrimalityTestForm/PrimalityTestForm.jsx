import React from 'react';
import { Box, FormControl, TextField, Button } from '@mui/material';

const PrimalityTestForm = ({ handleSubmit }) => (
	<Box component="form" onSubmit={handleSubmit}>
		<FormControl fullWidth variant="outlined">
			<TextField
				id="number"
				label="Enter an integer greater than 1"
				sx={{ mb: 3 }}
				required
				InputLabelProps={{ required: false }}
			/>
		</FormControl>
		<Button variant="contained" type="submit" size="large">
			Submit
		</Button>
	</Box>
);

export default PrimalityTestForm;
