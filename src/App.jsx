import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Test from './components/Test'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/folders/:folderId" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  )
}

export default App