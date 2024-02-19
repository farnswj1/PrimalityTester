import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const year: number = new Date().getFullYear();

const Footer: FC = () => (
  <Box component="footer" padding={2} marginTop="auto">
    <Typography variant="h6" align="center">
      &copy; {year} Justin Farnsworth
    </Typography>
  </Box>
);

export default Footer;
