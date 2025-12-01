import React, { Children, useContext } from 'react';
import { AunthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {loading,user} = useContext(AunthContext);
    const location = useLocation();
    console.log(location,user);
   
    if(loading == true){
        return <h1>loading Data</h1>
    }

    if(user == null){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }else{
        return children
    }
};

export default PrivateRoutes;