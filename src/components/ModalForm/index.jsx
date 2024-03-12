import React from 'react';

import { Stack, TextField, Modal, Box, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ButtonSubmit from '../generic/ButtonSubmit';

import CONSTANT from '../../constants/constant';

const style = {
    bgcolor: 'background.paper',
    border: `2px solid ${CONSTANT.color.border}`,
    boxShadow: 24,
    borderRadius: 10,
    p: 3,
};


const ModalForm = ({ open, handleClose, formik, btnName, isLoading }) => {
    const canSave = [formik.values.title, formik.values.discription].every(Boolean);

    const localHandleClose = () => {
        handleClose(formik.values);
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={localHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <Grid container spacing={0} justifyContent='center' >
                    <Grid item xs={10} sm={8} md={6} lg={6} sx={style}>
                        <Box>
                            <Stack alignItems={'flex-end'}>
                                <IconButton onClick={localHandleClose} >
                                    <CloseIcon color={CONSTANT.color.base} />
                                </IconButton>
                            </Stack>
                        </Box>
                        <Box>
                            <form onSubmit={formik.handleSubmit} >
                                <Stack alignItems='center' spacing={3}>
                                    <Grid item xs={8} >
                                        <TextField
                                            fullWidth
                                            id="title"
                                            name="title"
                                            label="Title"
                                            variant='standard'
                                            color={CONSTANT.color.base}
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.title && Boolean(formik.errors.title)}
                                            helperText={formik.touched.title && formik.errors.title}
                                        />
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            id="discription"
                                            name="discription"
                                            label="Discription"
                                            variant='standard'
                                            color={CONSTANT.color.base}
                                            value={formik.values.discription}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.discription && Boolean(formik.errors.discription)}
                                            helperText={formik.touched.discription && formik.errors.discription}
                                        />
                                    </Grid>
                                    <ButtonSubmit name={btnName} disabled={!canSave} />
                                </Stack>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    )
}

export default ModalForm
