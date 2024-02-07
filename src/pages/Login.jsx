import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

// import files
import Title from '../components/Title';
import FormikLogin from '../components/FormikLogin';

// Validation Schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required('Username is required'),
  email: yup
    .string()
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimun 6 characters')
    .required('Password is required'),
});

// Initial Values
const initialValues = {
  name: '',
  email: '',
  password: ''
}

function Login() {

  const [data, setData] = useState([]);
  const title = 'LOGIN';
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // check user exists or not
      try {
        // get all users
        const response = await axios.get('https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user');
        // console.log('get all user', response.status);
        if (response.status !== 200) {
          throw new Error(`Response Status: ${response.status}`);
        }
        setData(response.data);

        // find if user aleady present
        const findUser = data.find((element) => {
          return ((element.name === values.name) && (element.email === values.email) && (element.password === values.password))
        })

        // if user present re-direct to /task
        if (findUser) {
          localStorage.setItem("user", JSON.stringify(findUser));
          navigate('/task');
          // console.log(findUser);
        } else {
          alert('User Not Found!');
        }
        // console.log(response.data);
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
  });

  return (
    <Stack sx={{ height: '70vh', marginTop: '5%' }} spacing={2} alignItems='center' justifyContent='center'>
      <Container sx={{ borderRadius: '50px', background: '#FFF8DC', height: '60vh', border: '1px solid #C71585' }} maxWidth='sm'>
        <Stack sx={{ marginTop: '8%' }} spacing={2} textAlign='center'>
          <div>
            <Title title={title} />
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <div>
                  <div>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      variant='standard'
                      color='secondary'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </div>
                  <div>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant='standard'
                      color='secondary'
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
                      color='secondary'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </Stack>
            </form>
          </div>
        </Stack>
      </Container>
    </Stack>
  )
}

export default Login
