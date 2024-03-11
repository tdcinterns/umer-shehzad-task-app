import React, { useContext, useState } from 'react';

import { Button, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { tasksContext } from '../../pages/DisplayTask';
import UpdateTask from '../tasks/UpdateTask';

import CONSTANT from '../../constants/constant';

const TaskList = ({ getTaskById }) => {
  const { tasks, rowsPerPage, page, deleteTaskById } = useContext(tasksContext);
  const [editTaskId, setEditTaskId] = useState(null);

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
      <TableBody>
        {
          tasks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((task, index) => (
              <TableRow hover key={task.id}>
                <TableCell sx={{ width: 60 }}>
                  {startIndex + index}</TableCell>
                <TableCell sx={{ width: 140 }}>
                  {task.title}</TableCell>
                <TableCell sx={{ width: 600 }}>
                  {task.discription}</TableCell>
                <TableCell sx={{ width: 200 }} align='center'>
                  <span>
                    <Button onClick={() => deleteTaskById(task.id)}>
                      <DeleteIcon color={CONSTANT.color.error} />
                    </Button>
                  </span>
                  <span>
                    <Button onClick={() => handleEditClick(task.id)}>
                      <EditIcon color={CONSTANT.color.base} />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
            ))
        }
      </TableBody>
      {
        editTaskId &&
        (
          <UpdateTask taskId={editTaskId} handleClose={handleCloseModal} getTaskById={getTaskById} />
        )
      }
    </>
  )
}

export default TaskList
