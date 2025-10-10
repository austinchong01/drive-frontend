import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Test from './components/Test'
// import Login from './components/Login'
// import Register from './components/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  )
}

export default App