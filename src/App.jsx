import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Login,
  Register,
  LandingPage,
  FormPage,
  Dashboard,
  Settings,
  NotFound,
} from '../pages/index.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/formpage" element={<FormPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
