import React from 'react';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalForm = ({ open, handleClose, formik, buttonName }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton onClick={handleClose} style={{ position: 'absolute', right: 5, top: 5 }}>
                        <CloseIcon />
                    </IconButton>
                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} >
                        <Stack spacing={2}>
                            <div>
                                <div>
                                    <TextField
                                        disabled
                                        id="name"
                                        name="name"
                                        label="Name"
                                        variant='standard'
                                        value={formik.values.name}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="title"
                                        name="title"
                                        label="Title"
                                        variant='standard'
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
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    {buttonName}
                                </Button>
                            </div>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default ModalForm
