import { React, createContext, useContext, useEffect, useState } from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Paper } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import files
import TaskList from '../components/TaskList';
import Title from '../components/Title';
import CreateTask from '../components/tasks/CreateTask';

//import loading context
import { loadingContext } from '../App';

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
    const { isLoading, setIsLoading } = useContext(loadingContext);
    // console.log('Display', isLoading);
    const [tasks, setTasks] = useState([]);
    const message = `Hi! ${JSON.parse(localStorage.getItem("user")).name}`;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    useEffect(() => {
        getTaskById()
        // .then(() => setIsLoading(false))
        // .catch(console.error);
    }, []);

    // get userID from localStorage
    const userID = JSON.parse(localStorage.getItem("user")).id;
    const url = `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task`;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    // get tasks by userID
    const getTaskById = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            if (response.status !== 200) {
                throw new Error(`Response Status: ${response.status}`);
            }
            // console.log('data', response.data);
            setTasks(response.data);
            // console.log('tasks:', tasks);
        } catch (err) {
            console.log('error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    // delete task by task ID
    const deleteTaskById = async (id) => {
        let response = await axios.delete(`https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task/${id}`);
        if (response) {
            getTaskById();
        }
    }

    return (
        <>
            <Container >
                <Stack textAlign='center' spacing={5} marginTop='40px'>
                    <div>
                        <Title title={message} />
                    </div>
                    <Box>
                        <div>
                            {/* Add Task */}
                            <CreateTask getTaskById={getTaskById} />
                        </div>

                        {
                            isLoading
                                ? <CircularProgress color='secondary' />
                                :
                                <>
                                    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1rem', border: '1px solid #C71585' }}>
                                        <TableContainer sx={{ maxHeight: 440 }}>
                                            <Table aria-label="custom table">
                                                <TableHead >
                                                    <TableRow>
                                                        <StyledTableCell>NO.</StyledTableCell>
                                                        <StyledTableCell>TITLE</StyledTableCell>
                                                        <StyledTableCell>DISCRIPTION</StyledTableCell>
                                                        <StyledTableCell align='center'>ACTIONS</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <tasksContext.Provider
                                                    value={{ tasks, page, rowsPerPage, deleteTaskById }}>
                                                    {/* Table Body */}
                                                    <TaskList />
                                                </tasksContext.Provider>


                                            </Table>
                                        </TableContainer>

                                        {/* Pagination */}
                                        <TablePagination
                                            rowsPerPageOptions={[1, 2, 3]}
                                            component="div"
                                            count={tasks.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </>
                        }
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default DisplayTask
