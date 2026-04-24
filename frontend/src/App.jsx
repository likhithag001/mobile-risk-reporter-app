import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import RiskForm from './pages/RiskForm'
import RiskList from './pages/RiskList'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <RiskList />
            </ProtectedRoute>
          }/>
          <Route path="/create" element={
            <ProtectedRoute>
              <RiskForm />
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App