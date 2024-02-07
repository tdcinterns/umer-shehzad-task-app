import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const FormikLogin = ({ initialValues, validationSchema, onSubmit }) => {
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Stack spacing={2}>
                        <div>
                            <div>
                                <TextField
                                    id="name"
                                    name='user'
                                    label="Username"
                                    variant="standard"
                                    type='text'
                                    value={initialValues.name}
                                />
                            </div>

                            <div>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="standard"
                                    type='email'
                                />
                            </div>

                            <div>
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="standard"
                                    type='password'
                                />

                            </div>
                        </div>

                        <div>
                            {/* <Button
                                type='submit'
                                variant="outlined"
                            >
                                Login
                            </Button> */}
                            <button type="submit">Login</button>
                        </div>
                    </Stack>

                    {/* <div>
                        <label htmlFor="userName">User Name:</label>
                        <Field
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Username"
                        />
                        <ErrorMessage name="userName" component="div" />
                    </div> */}

                    {/* <div>
                        <label htmlFor="password">Password:</label>
                        <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" />
                    </div> */}

                    {/* <div>
                        <button type="submit">Login</button>
                    </div> */}
                </Form>
            </Formik>
        </>
    )
}

export default FormikLogin
