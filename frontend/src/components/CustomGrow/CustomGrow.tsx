import { FC } from 'react';
import { Grow, GrowProps } from '@mui/material';

const CustomGrow: FC<GrowProps> = (props) => (
  <Grow in={true} timeout={1200} {...props} />
);

export default CustomGrow;
