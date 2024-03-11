import React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import ModalForm from '../../ModalForm';
import ButtonSubmit from '../../generic/ButtonSubmit';

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
  const [open, setOpen] = React.useState(false);
  const userID = JSON.parse(localStorage.getItem("user")).id;
  const url = `${CONSTANT.baseURL}/${userID}/task`;

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
        
        const response = await axios.post(url, values);
        console.log(response);
        if (response.status !== 201) {
          throw new Error(`Response Status: ${response.status}`);
        }
        handleClose(values);
        getTaskById();
      } catch (err) {
        console.log('error:', err);
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
