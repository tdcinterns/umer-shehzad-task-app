import React, { useState, useEffect } from 'react';

import { Button, TableBody, TableRow, TableCell, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';

import UpdateTask from '../tasks/UpdateTask';
import { deleteTask } from '../../redux/tasksSlice';

import CONSTANT from '../../constants/constant';

const TaskList = ({ tasks, page, rowsPerPage, setPage }) => {
  const dispatch = useDispatch();

  const [editTaskId, setEditTaskId] = useState(null);

  // Update page number when the last task on the page is deleted
  useEffect(() => {
    const totalPages = Math.ceil(tasks.length / rowsPerPage);
    if (page > totalPages - 1) {
      setPage(totalPages - 1);
    }
  }, [tasks, page, rowsPerPage, setPage]);

  const onDeleteTaskClicked = (taskID) => {
    try {
      dispatch(deleteTask({ id: taskID })).unwrap();
    } catch (err) {
      console.log('Faied to delete the post', err);
    }
  }

  const handleEditClick = (taskId) => {
    setEditTaskId(taskId); // Set the ID of the task being edited
  };

  const handleCloseModal = () => {
    setEditTaskId(null); // Reset the task ID when the modal is closed
  };

  // calculate starting index for each page
  const startIndex = page * rowsPerPage + 1;

  return (
    <>
        {
          tasks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((task, index) => (
              <TableRow hover key={task.id} >
                <TableCell sx={{ width: 60 }}>
                  {startIndex + index}
                </TableCell>
                <TableCell sx={{ width: 140 }}>
                  {task.title}
                </TableCell>
                <TableCell sx={{ width: 600 }}>
                  {task.discription}
                </TableCell>
                <TableCell sx={{ width: 200 }} align='center'>
                  <Button onClick={() => onDeleteTaskClicked(task.id)}>
                    <DeleteIcon color={CONSTANT.color.error} />
                  </Button>

                  <Button onClick={() => handleEditClick(task.id)}>
                    <EditIcon color={CONSTANT.color.base} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
        }
      {
        editTaskId &&
        (
          <UpdateTask taskId={editTaskId} handleClose={handleCloseModal} />
        )
      }
    </>
  )
}

export default TaskList
