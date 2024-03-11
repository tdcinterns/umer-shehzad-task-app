import React from "react";

import { Navigate, Outlet } from 'react-router-dom';

const PrivateComp = () => {
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateComp;
