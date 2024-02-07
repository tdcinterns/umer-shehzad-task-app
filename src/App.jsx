import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Box} from "@mui/material";

// import files
import SideNav from '../src/components/SideNav';
import PrivateComp from '../src/components/PrivateComp';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import DisplayTask from '../src/pages/DisplayTask';
import UpdateTask from "./components/tasks/UpdateTask";


function App() {

  // title
  const title = 'Task Application'

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route element={<PrivateComp />} >
              <Route path='/task' element={<DisplayTask />} />
              <Route path='/update/:id' element={ <UpdateTask /> }/>
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
