import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/login" element={
        <Login/>
      } />
      <Route path="/chat" element={
        <Chat/>
      } />
    </Routes>
  )
}

export default App
