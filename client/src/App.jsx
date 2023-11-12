import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Tracker from './pages/Tracker';
import { Route , Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/global/ProtectedRoutes';

export default function App() {
    return (
        <div> 
            <Header />
            <ToastContainer position="bottom-right"/>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route 
                    path='/tracker' 
                    element={
                        <ProtectedRoutes >
                            <Tracker />
                        </ProtectedRoutes>
                    } 
                />
            </Routes>
        </div>
    )
}
