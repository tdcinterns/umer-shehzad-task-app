import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import * as yup from 'yup';
import { Container, Stack, } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

// Validation Schema
const validationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    discription: yup
        .string()
        .required('Discription is required'),
});

const UpdateTask = () => {

    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const buttonName = 'Update Task';
    // user ID
    const userID = JSON.parse(localStorage.getItem("user")).id;
    // get name from localStorage
    const userName = JSON.parse(localStorage.getItem("user")).name;

    useEffect(() => {
        getSingleTaskDetails()
            .then(() => setIsLoading(false))
            .catch(console.error);
    }, [])

    // get single task details
    const getSingleTaskDetails = async () => {
        let response = await axios.get(`https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task/${params.id}`);
        // console.log('response:', response.data);
        setData(response.data);
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            title: '',
            discription: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.put(`https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task/${params.id}`, values);
                // console.log('update response',response);
                if (response.status !== 200) {
                    throw new Error(`Response Status: ${response.status}`);
                }
                navigate('/task');
            } catch (err) {
                console.log('error:', err);
            }
        }
    });

    useEffect(() => {
        if (data) {
            // Use formik.setFieldValue to set individual values
            formik.setFieldValue('name', data.name);
            formik.setFieldValue('title', data.title);
            formik.setFieldValue('discription', data.discription);
        }
    }, [data]);

    return (
        <>
            <Stack sx={{ height: '70vh', marginTop: '5%' }} spacing={2} alignItems='center' justifyContent='center'>
                <Container sx={{ borderRadius: '50px', background: '#FFF8DC', height: '60vh', border: '1px solid #C71585' }} maxWidth='sm'>
                    <Stack sx={{ marginTop: '5rem' }} spacing={2} textAlign='center' alignItems="center">
                        {
                            isLoading
                                ? <CircularProgress color='secondary' />
                                :
                                data && (
                                    <form onSubmit={formik.handleSubmit}>
                                        <Stack spacing={5}>
                                            <div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        id="name"
                                                        name="name"
                                                        label="Name"
                                                        variant='standard'
                                                        color='secondary'
                                                        value={formik.values.name}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        id="title"
                                                        name="title"
                                                        label="Title"
                                                        variant='standard'
                                                        color='secondary'
                                                        value={formik.values.title}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                                        helperText={formik.touched.title && formik.errors.title}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        id="discription"
                                                        name="discription"
                                                        label="Discription"
                                                        variant='standard'
                                                        color='secondary'
                                                        value={formik.values.discription}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.discription && Boolean(formik.errors.discription)}
                                                        helperText={formik.touched.discription && formik.errors.discription}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    type="submit"
                                                >
                                                    {buttonName}
                                                </Button>
                                            </div>
                                        </Stack>
                                    </form>
                                )
                        }
                        {/* </div> */}
                        {/* {
                            isLoading && 
                        } */}
                    </Stack>
                </Container>
            </Stack>
        </>
    )
}

export default UpdateTask
