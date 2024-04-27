import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import RegistraterForm from './Pages/Auth/Register';
import LoginForm from './Pages/Auth/Login';
import NotFoundPage from './Pages/NotFoundPage';
import PrivateRoute from './routes/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="home" element={
              <PrivateRoute element={<Home />} />
            } />
            <Route path="/register" element={<RegistraterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
