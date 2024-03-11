import React from 'react';

import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

import CONSTANT from '../constants/constant';

const NotFound = () => {
  return (
    <Container>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>
      <Button component={Link} to="/task" variant="contained" color={CONSTANT.color.base}>
        Go Back
      </Button>
    </Container>
  );
};

export default NotFound;
