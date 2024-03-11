import React, { useEffect, useState } from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import ModalForm from '../../ModalForm';

import CONSTANT from '../../../constants/constant';

// Validation Schema
const validationSchema = yup.object({
    title: yup
        .string()
        .required('Required'),
    discription: yup
        .string()
        .required('Required'),
});


const UpdateTask = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const userID = JSON.parse(localStorage.getItem("user")).id;
    const url = `${CONSTANT.baseURL}/${userID}/task/${props.taskId}`;

    useEffect(() => {
        getSingleTaskDetails();
    }, [props.taskId, userID])

    // get single task details
    const getSingleTaskDetails = async () => {
        try {
            setIsLoading(true);
            let response = await axios.get(url);
            if (response.status === 200) {
                formik.setValues(response.data)
                setIsLoading(false);
            } else {
                setIsLoading(false);
                throw new Error(`Response Status: ${response.status}`);
            }
        } catch (err) {
            setIsLoading(false);
            console.log('Error fetching single task: ', err);
        }
    }

    const handleClose = (values) => {
        // clear title and description values before close
        values.title = '';
        values.discription = '';
        props.handleClose();
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            discription: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.put(url, values);
                if (response.status === 200) {
                    handleClose(values);
                    props.getTaskById();
                } else {
                    throw new Error(`Response Status: ${response.status}`);
                }
            } catch (err) {
                console.log('Error updating task:', err);
            }
        }
    });

    return (
        <ModalForm
            handleClose={handleClose}
            open={true}
            formik={formik}
            btnName={CONSTANT.updateBtnName}
            isLoading={isLoading}
        />
    );
};

export default UpdateTask;
