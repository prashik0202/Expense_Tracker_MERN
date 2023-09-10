import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route , Routes } from 'react-router-dom';

export default function App() {
    return (
        <div> 
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                
            </Routes>
        </div>
    )
}
