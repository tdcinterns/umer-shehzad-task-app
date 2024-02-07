import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from "@mui/material/Stack";
import { Button, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';


const TaskList = ({ tasks, deleteTaskById, rowsPerPage, page }) => {

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
                  <TableCell>{startIndex + index}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.discription}</TableCell>
                  <TableCell>
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
