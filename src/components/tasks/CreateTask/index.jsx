import React from 'react';
import Button from "@mui/material/Button";
// import Modal from '@mui/material/Modal';

// import { useNavigate } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

// import files
import ModalForm from '../../ModalForm';

// Validation Schema
const validationSchema = yup.object({
  // name: yup
  //   .string()
  //   .required('Username is required'),
  title: yup
    .string()
    .required('Title is required'),
  discription: yup
    .string()
    .required('Discription is required'),
});

const CreateTask = ({ getTaskById }) => {

  // get name from localStorage
  const userName = JSON.parse(localStorage.getItem("user")).name;
 
  // Initial Values
  const initialValues = {
    name: userName,
    title: '',
    discription: ''
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (values) => {
    // clear title and description values before close
    values.title = '';
    values.discription = '';

    setOpen(false)
  };
  const buttonName = 'Add Task';
  // const navigate = useNavigate();

  

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userID = JSON.parse(localStorage.getItem("user")).id;
        const response = await axios.post(`https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task`, values);
        console.log(response);
        if (response.status !== 201) {
          throw new Error(`Response Status: ${response.status}`);
        }
        // setTasks(response.data);
        handleClose(values);
        getTaskById();
        // navigate('/task');
      } catch (err) {
        console.log('error:', err);
      }
    }
  });


  return (
    <>
      <Button
        variant="contained"
        color='secondary'
        onClick={handleOpen}
      >
        Create Task
      </Button>
      {/* Modal for create task */}
      <ModalForm
        handleClose={handleClose}
        open={open}
        formik={formik}
        buttonName={buttonName}
      />
    </>
  )
}

export default CreateTask
