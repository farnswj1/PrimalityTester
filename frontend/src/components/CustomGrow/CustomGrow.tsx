import React, { FC, ReactElement } from 'react';
import { Grow } from '@mui/material';

interface Props {
  children: ReactElement,
  rest?: object
};

const CustomGrow: FC<Props> = ({ children, ...rest }) => (
  <Grow in={true} timeout={1200} {...rest}>
    {children}
  </Grow>
);

export default CustomGrow;
