import { React, createContext, memo, useEffect, useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Stack, Container, Box, Paper, Typography, CircularProgress, Avatar } from '@mui/material';
import { Table, TableHead, TableRow, TablePagination, TableContainer, Grid, TableBody } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';

import TaskList from '../components/TaskList';
import Title from '../components/generic/Title';
import CreateTask from '../components/tasks/CreateTask';
import { selectAllTasks, getTasksStatus, getTaskError, fetchTasks } from '../redux/tasksSlice';

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
    const dispatch = useDispatch();

    const tasks = useSelector(selectAllTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTaskError);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const userName = JSON.parse(localStorage.getItem("user")).name;
    const message = `${CONSTANT.greeting} ${userName}`;

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (tasksStatus === 'idle') {
            dispatch(fetchTasks());
        }
    }, [tasksStatus, dispatch]);

    let content;
    if (tasksStatus === 'loading') {
        content = <CircularProgress color={CONSTANT.color.base} />;
    } else if (tasksStatus === 'succeeded') {
        if (tasks.length > 0) {
            content = <TaskList tasks={tasks} page={page} rowsPerPage={rowsPerPage} setPage={setPage} />;
        } else {
            content = <Typography variant='h6' color={CONSTANT.color.border} mt={3}>
                Press Create Task Button to add.
            </Typography>
        }
    } else if (tasksStatus === 'failed') {
        content = <p>{tasksError}</p>
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
                            sx={{ 
                                bgcolor: `${CONSTANT.color.avatarBg}`, 
                                width: isMediumScreen ? '60px' : '90px',
                                height: "auto", 
                                aspectRatio: 1, 
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Stack textAlign='center' spacing={6} mt={3}>
                <Box>
                    <CreateTask />
                </Box>
                <Box>
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

                                <TableBody>
                                    {content}
                                </TableBody>

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
                </Box>
            </Stack>
        </Container>
    )
}

export default memo(DisplayTask)
