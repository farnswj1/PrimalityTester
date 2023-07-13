import { FC } from 'react';
import { Paper } from '@mui/material';

const CustomPaper: FC = ({ children }) => (
  <Paper square={false} sx={{ p: 2 }}>
    {children}
  </Paper>
);

export default CustomPaper;
