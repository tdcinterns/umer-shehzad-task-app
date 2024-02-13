import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';

// import task Context
import { tasksContext } from '../../pages/DisplayTask';


const TaskList = () => {
  const { tasks, rowsPerPage, page, deleteTaskById } = useContext(tasksContext);

  // calculate starting index for each page
  const startIndex = page * rowsPerPage + 1;
  return (
    <>
      <TableBody>
        {
          tasks.length > 0
            ? tasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task, index) => (
                <TableRow hover key={task.id}>
                  <TableCell sx={{ width: 60 }}>
                    {startIndex + index}</TableCell>
                  <TableCell sx={{ width: 140 }}>
                    {task.title}</TableCell>
                  <TableCell sx={{ width: 600 }}>
                    {task.discription}</TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <Button onClick={() => deleteTaskById(task.id)}>
                      <DeleteIcon color='error' />
                    </Button>
                    <Button LinkComponent={Link} to={`/update/${task.id}`}>
                      <EditIcon color='secondary' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : <h3>No Record Found. Press Create Task Button to add.</h3>
        }
      </TableBody>
    </>
  )
}

export default TaskList
