import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import InstructorDashboard from './pages/InstructorDashboard'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/instructor" element={user?.role === 'instructor' ? <InstructorDashboard setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App