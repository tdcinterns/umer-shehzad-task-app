import React, { useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

// import files
import Title from '../components/Title';

const Home = () => {
  const title = 'Welcome to our Task Management App';
  const navigate = useNavigate();

  // if user logged in, it should not visit Home Page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/task');
    }
  });

  return (
    <>
      <Title title={title} />
      <Typography paragraph>
        Click on Login button in the side bar to use application.
      </Typography>
    </>
  )
}

export default Home
