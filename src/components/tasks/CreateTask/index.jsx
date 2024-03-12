import React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ModalForm from '../../ModalForm';
import ButtonSubmit from '../../generic/ButtonSubmit';
import { addNewTask } from '../../../redux/tasksSlice';

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

const CreateTask = ({ getTaskById }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const userName = JSON.parse(localStorage.getItem("user")).name;

  // Initial Values
  const initialValues = {
    title: '',
    discription: ''
  }

  const handleOpen = () => setOpen(true);
  const handleClose = (values) => {
    // clear title and description values before close
    values.title = '';
    values.discription = '';
    setOpen(false)
  };


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        values.name = userName;  // add username to payload
        const { title, discription, name } = values;  //destructure data

        dispatch(addNewTask({ title, discription, name })).unwrap();

        handleClose(values);
        navigate('/task');
      } catch (err) {
        console.error('Failed to save the task', err);
      }
    }
  });

  return (
    <>
      <div style={{ display: 'flex' }}>
        <ButtonSubmit
          name={CONSTANT.createBtnName}
          onClick={handleOpen}
        />
      </div>
      {/* Modal for create task */}
      <ModalForm
        handleClose={handleClose}
        open={open}
        formik={formik}
        btnName={CONSTANT.addBtnName}
      />
    </>
  )
}

export default CreateTask
