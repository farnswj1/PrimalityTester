import React, { useState } from 'react';
import { Paper, Box, Typography, FormControl, TextField, Button } from '@mui/material';

const PrimalityTestForm = ({ handleSubmit }) => {
	const [error, setError] = useState(false);
	const [formChanged, setFormChanged] = useState(false);

	const handleNumberChange = (event) => {
		const number = event.target.value.trim();
		const intRegex = /^([2-9]|[1-9][0-9]+)$/;
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
