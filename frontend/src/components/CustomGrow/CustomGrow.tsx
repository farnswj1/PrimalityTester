import { FC, ReactElement } from 'react';
import { Grow } from '@mui/material';

interface CustomGrowProps {
  children: ReactElement,
  rest?: object
};

const CustomGrow: FC<CustomGrowProps> = ({ children, ...rest }) => (
  <Grow in={true} timeout={1200} {...rest}>
    {children}
  </Grow>
);

export default CustomGrow;
