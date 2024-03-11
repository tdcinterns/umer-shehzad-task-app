import { React, createContext, memo, useContext, useEffect, useState, lazy, Suspense } from 'react';

import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Stack, Container, Box, Paper, Typography, CircularProgress, Avatar } from '@mui/material';
import { Table, TableHead, TableRow, TablePagination, TableContainer, Grid } from '@mui/material';

import TaskList from '../components/TaskList';
import Title from '../components/generic/Title';
import CreateTask from '../components/tasks/CreateTask';

import MyPic from '../assets/my-pic-1.png';
import CONSTANT from '../constants/constant';

// Custom style for Table Head
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FFF8DC',
        color: '#C71585',
        fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

// create context for tasks
export const tasksContext = createContext();

const DisplayTask = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    debugger
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const userID = JSON.parse(localStorage.getItem("user")).id;
    const userName = JSON.parse(localStorage.getItem("user")).name;
    const message = `${CONSTANT.greeting} ${userName}`;

    // useEffect(() => {
    //     getTaskById();
    // }, []);

    // get all tasks by userID
    const getTaskById = async () => {
        try {
            setIsLoading(true);
            console.log(isLoading);
            debugger
            const response = await axios.get(`${CONSTANT.baseURL}/${userID}/task`);
            if (response.status !== 200) {
                throw new Error(`Response Status: ${response.status}`);
            }
            setTasks(response.data);
            setIsLoading(false);
            console.log(isLoading);
            debugger
        } catch (err) {
            setIsLoading(false);
            console.log('Error fetching task by ID:', err);
        }
    }
    useEffect(() => {
        getTaskById();
    }, []);

    // delete task by task ID
    const deleteTaskById = async (id) => {
        try {
            let response = await axios.delete(`${CONSTANT.baseURL}/${userID}/task/${id}`);
            if (response) {
                getTaskById();
            }
        } catch (err) {
            console.log('Error deleting task:', err);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    return (
        <Container>
            <Box sx={{ marginTop: '1rem' }}>
                <Grid container alignItems='center'>
                    <Grid item xs={10}>
                        <Title title={message} />
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Avatar
                            alt={`${CONSTANT.userName}`}
                            src={`${MyPic}`}
                            sx={{ bgcolor: `${CONSTANT.color.avatarBg}`, width: 56, height: 56 }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Stack textAlign='center' spacing={6} mt={3}>
                <Box>
                    <CreateTask getTaskById={getTaskById} />
                </Box>
                <Box>
                    {
                        isLoading
                            ? (<CircularProgress color={CONSTANT.color.base} />)
                            : tasks.length > 0
                                ? (
                                    <Paper sx={{ width: '100%', overflow: 'hidden', border: `1px solid ${CONSTANT.color.border}` }}>
                                        <TableContainer sx={{ maxHeight: 440 }}>
                                            <Table aria-label='custom table'>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell>NO.</StyledTableCell>
                                                        <StyledTableCell>TITLE</StyledTableCell>
                                                        <StyledTableCell>DESCRIPTION</StyledTableCell>
                                                        <StyledTableCell align='center'>ACTIONS</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <tasksContext.Provider value={{ tasks, page, rowsPerPage, deleteTaskById }}>

                                                    <TaskList getTaskById={getTaskById} />

                                                </tasksContext.Provider>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[1, 2, 3]}
                                            component='div'
                                            count={tasks.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                )
                                : (
                                    <Typography variant='h6' color={CONSTANT.color.border} mt={3}>
                                        No Record Found. Press Create Task Button to add.
                                    </Typography>
                                )
                    }
                </Box>
            </Stack>
        </Container>
    )
}

export default memo(DisplayTask)
