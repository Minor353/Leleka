import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'

import { Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={
        <Login/>
      } />

      <Route path="/chat" element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/chat" />} /> 
    </Routes>
  )
}

export default App
