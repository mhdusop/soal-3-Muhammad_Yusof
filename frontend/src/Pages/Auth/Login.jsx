import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
   const [credentials, setCredentials] = useState({ email: '', password: '' });
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('userToken');
      if (token) {
         navigate('/home');
         location.reload()
      }
   }, [navigate]);

   const handleChange = (event) => {
      const { name, value } = event.target;
      setCredentials(prevState => ({ ...prevState, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const response = await loginUser(credentials);
         if (response.success) {
            toast.success('Login Successful');
            navigate('/home');
            location.reload()
         } else {
            toast.error(response.message || 'Login failed');
         }
      } catch (error) {
         toast.error('Gagal masuk. Silakan periksa kredensial Anda dan coba lagi.');
      }
   };

   return (
      <>
         <ToastContainer position="top-right" autoClose={5000} />
         <h1 className='text-center fw-semibold my-4'>Login Form</h1>
         <div className="container d-flex justify-content-center m-auto">
            <div className="card p-4" style={{ "width": "30rem" }} >
               <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                     <label>Email:</label>
                     <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                     />
                  </div>
                  <div>
                     <label>Password:</label>
                     <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                     />
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                     <button className="btn btn-primary" type="submit">Login</button>
                     <a href="/register" className="btn btn-link align-self-center">Register</a>
                  </div>
               </form>

            </div>
         </div>
      </>
   );
}

export default LoginForm;
