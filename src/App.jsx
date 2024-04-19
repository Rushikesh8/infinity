import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Text } from '@mantine/core';
import SharedLayout from './pages/SharedLayout';
import ProtectedRoute from './pages/ProtectedRoute';
import RegulationDetail from "./pages/regulationDetail"
import Home from './pages/Home';
import About from './pages/About';
import { Login } from './pages/login';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

function App() {
  const [count, setCount] = useState(0)
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') || null
  console.log('isUserLoggedIn', isUserLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<ProtectedRoute user={isUserLoggedIn}><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />}/>
          <Route path="about" element={<About />} />
          <Route path="regulation/:regulation_id" element={<ProtectedRoute user={isUserLoggedIn}><RegulationDetail /></ProtectedRoute>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
