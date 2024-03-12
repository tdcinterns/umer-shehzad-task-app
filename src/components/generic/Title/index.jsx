import React from 'react';

import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import CONSTANT from '../../../constants/constant';

const Title = ({title}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Typography 
        variant={isSmallScreen ? "h4" : "h2"}
        color={CONSTANT.color.border}
      >
        {title}
      </Typography>
    </>
  )
}

export default Title
