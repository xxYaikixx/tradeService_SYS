import React from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Top } from "./components/Top";
import { Login } from "./components/Login";
import { CreateItem } from "./components/CreateItem";
import { CreateItemConfirm } from "./components/CreateItemConfirm";
import { Register } from "./components/Register";
import { createRoot } from 'react-dom/client';

import axios from 'axios';
import { RegisterConfirm } from './components/RegisterConfirm';

axios.defaults.baseURL = "http://localhost/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export const Example = () => {
    return (
        <>
            <React.StrictMode>
                <BrowserRouter>
                    <>
                        <Routes>
                            <Route path="/" element={<Top />} />
                            <Route path="/login" element={<Login />} />;
                            <Route path="/create" element={<CreateItem />} />;
                            <Route path="/create/confirm" element={<CreateItemConfirm />} />;
                            <Route path="/register" element={<Register />} />;
                            <Route path="/register/confirm" element={<RegisterConfirm />} />;
                        </Routes>
                    </>
                </BrowserRouter>
            </React.StrictMode>
        </>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Example />);