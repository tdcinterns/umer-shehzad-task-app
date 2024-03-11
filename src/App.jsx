import { React, createContext, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import SideNav from '../src/components/SideNav';
import PrivateComp from '../src/components/PrivateComp';
import Login from '../src/pages/Login';
import DisplayTask from '../src/pages/DisplayTask';
import NotFound from '../src/pages/NotFound';

import CONSTANT from '../src/constants/constant';

// create loading context
export const loadingContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <BrowserRouter>
       <Box sx={{ display: 'flex', backgroundColor: `${CONSTANT.color.container}`, minHeight: '100vh' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: `${CONSTANT.color.container}`, boxSizing: 'border-box', }}>
          <loadingContext.Provider value={{ isLoading, setIsLoading }}>
            <Routes>
              <Route element={<PrivateComp />} >
                {/* <Route path='/' element={<Home />} /> */}
                <Route path='/task' element={<DisplayTask />} />
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='/login' element={<Login />} />
            </Routes>
          </loadingContext.Provider>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
