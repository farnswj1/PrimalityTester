import { FC } from 'react';
import { Paper, PaperProps } from '@mui/material';

const CustomPaper: FC<PaperProps> = ({ children }) => (
  <Paper square={false} sx={{ p: 2 }}>
    {children}
  </Paper>
);

export default CustomPaper;
