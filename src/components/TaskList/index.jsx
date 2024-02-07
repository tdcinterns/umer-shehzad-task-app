import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from "@mui/material/Stack";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const TaskList = ({ tasks, deleteTaskById, rowsPerPage, page }) => {

  // calculate starting index for each page
  const startIndex = page * rowsPerPage + 1;
  return (
    <>

      <List>
        {
          tasks.length > 0
            ? tasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task, index) => (
                <ListItem key={task.id}>
                  <Stack>
                    <div>
                      <ListItemText>{`${startIndex + index}. ${task.title}`}</ListItemText>
                    </div>

                    <div>
                      <ListItemText>{task.discription}</ListItemText>
                    </div>
                    <div>
                      <Button onClick={() => deleteTaskById(task.id)}>Delete</Button>
                      <Button LinkComponent={Link} to={`/update/${task.id}`}>Update</Button>
                    </div>
                  </Stack>
                </ListItem>
              ))
            : <h3>No Record Found. Press Create Task Button to add.</h3>
        }
      </List>
    </>
  )
}

export default TaskList
