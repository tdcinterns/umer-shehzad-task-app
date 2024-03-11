import React, { useContext, useEffect, useState } from 'react';

import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Stack, TextField, Alert, IconButton } from '@mui/material';

import Title from '../components/generic/Title';
import ButtonSubmit from '../components/generic/ButtonSubmit';
import { loadingContext } from '../App';

import CONSTANT from '../constants/constant';

// Validation Schema
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Not Valid')
    .required('Required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .required('Required'),
});

function Login() {
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // check user exists or not
      try {
        setIsLoading(true);
        // get all users
        const response = await axios.get(CONSTANT.baseURL);
        if (response.status !== 200) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const dataOfUser = response?.data;

        // find if user present
        const findUser = dataOfUser.find((element) => {
          return element.email === values.email;
        })

        // if user present, match pass & re-direct to /task dashboard
        if (findUser) {
          if (findUser.password === values.password) {
            localStorage.setItem("user", JSON.stringify(findUser));
            navigate('/task');
          } else {
            setShowAlert(true);
            setAlertMessage('Incorrect Password.');
          }
        } else {
          setShowAlert(true);
          setAlertMessage('User Not Found.');
        }
        setIsLoading(false);
      } catch (err) {
        console.log('error:', err);
      }
    }
  });

  // if user logged in, it should not visit Login Page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/task')
    }
  }, [navigate]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  return (
    <>
      <Stack sx={{ height: '70vh', marginTop: '5%' }} spacing={2} alignItems='center' justifyContent='center'>
        {showAlert && (
          <Alert severity="error" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
            {alertMessage}
          </Alert>
        )}
        <Container sx={{ borderRadius: '50px', background: `${CONSTANT.color.loginBg}`, height: '60vh', border: `1px solid ${CONSTANT.color.border}` }} maxWidth='sm'>
          <Stack sx={{ marginTop: '8%' }} spacing={2} textAlign='center'>
            <div>
              <Title title={CONSTANT.login.title} />
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={5}>
                  <div>
                    <div>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant='standard'
                        color={CONSTANT.color.base}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </div>
                    <div>
                      <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant='standard'
                        color={CONSTANT.color.base}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    </div>
                  </div>
                  <div>
                    <ButtonSubmit name={CONSTANT.login.BtnName} isLoading={isLoading}/>
                  </div>
                </Stack>
              </form>
            </div>
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export default Login
