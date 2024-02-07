import React from 'react';
import { Typography } from '@mui/material';

const Title = ({title}) => {
  return (
    <>
      <Typography 
        variant='h3' 
        color='#C71585'
      >
        {title}
      </Typography>
    </>
  )
}

export default Title
