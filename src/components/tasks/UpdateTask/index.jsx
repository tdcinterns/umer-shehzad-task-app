import React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import ModalForm from '../../ModalForm';
import { selectTaskById, updateTask } from '../../../redux/tasksSlice';

import CONSTANT from '../../../constants/constant';
import { useNavigate } from 'react-router-dom';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const task = useSelector((state) => selectTaskById(state, props.taskId));
    const initialValues = {
        title: task.title,
        discription: task.discription
    }

    const handleClose = (values) => {
        // clear title and description values before close
        values.title = '';
        values.discription = '';
        props.handleClose();
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const { title, discription } = values;

                dispatch(updateTask({ id: props.taskId, discription, title })).unwrap();
                handleClose(values);
                navigate('/task');
            } catch (err) {
                console.error('Failed to update the task', err);
            }
        }
    });

    return (
        <ModalForm
            handleClose={handleClose}
            open={true}
            formik={formik}
            btnName={CONSTANT.updateBtnName}
        />
    );
};

export default UpdateTask;
