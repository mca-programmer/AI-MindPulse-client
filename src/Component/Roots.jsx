import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Loader from './Loader';

const Roots = () => {
    return (
        <div>
           
            <Navbar></Navbar>
           
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Roots;