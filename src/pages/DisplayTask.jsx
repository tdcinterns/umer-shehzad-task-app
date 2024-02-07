import { React, useEffect, useState } from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Paper } from '@mui/material';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';

// import files
import TaskList from '../components/TaskList';
import Title from '../components/Title';
import CreateTask from '../components/tasks/CreateTask';

// get userID from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const userID = user.id;
const url = `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}/task`;

const DisplayTask = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const message = `Hi! ${JSON.parse(localStorage.getItem("user")).name}`;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    useEffect(() => {
        // console.log('userID',userID);
        getTaskById()
            .then(() => setIsLoading(false))
            .catch(console.error);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    // get tasks by userID
    const getTaskById = async () => {
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
                            <CreateTask getTaskById={getTaskById} />
                        </div>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {
                                tasks &&
                                    // ? <p>loading...</p>
                                    // : 
                                  <>
                                    <TaskList
                                        tasks={tasks}
                                        deleteTaskById={deleteTaskById}
                                        rowsPerPage={rowsPerPage} 
                                        page={page}
                                    />
                                    <TablePagination
                                    rowsPerPageOptions={[1, 2, 3]}
                                    component="div"
                                    count={tasks.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                  </>
                            }
                            {
                                isLoading && <p>loading...</p>
                            }
                            
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default DisplayTask
