import React from 'react';

import { Typography } from '@mui/material';
import CONSTANT from '../../../constants/constant';

const Title = ({title}) => {
  return (
    <>
      <Typography 
        variant='h3' 
        color={CONSTANT.color.border}
      >
        {title}
      </Typography>
    </>
  )
}

export default Title
