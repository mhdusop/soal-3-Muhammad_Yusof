import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
   const navigate = useNavigate()

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: ''
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const validateForm = () => {
      const { name, email, phone, password, password_confirmation } = formData;
      if (!name || name.length < 3 || name.length > 255) {
         toast.error("Nama harus minimal 3 karakter.");
         return false;
      }
      if (!email.match(/^\S+@\S+\.\S+$/)) {
         toast.error("Format email tidak valid.");
         return false;
      }
      if (!phone.startsWith('08') || !/^\d+$/.test(phone) || phone.length < 8 || phone.length > 15) {
         toast.error("Nomor Hp harus diawali dengan 08 dan berisi antara 8 sampai 15 angka.");
         return false;
      }
      if (password.length < 8) {
         toast.error("Password harus minimal 8 karakter.");
         return false;
      }
      if (password !== password_confirmation) {
         toast.error("Konfirmasi password tidak cocok.");
         return false;
      }
      return true;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (validateForm()) {
         try {
            await registerUser(formData);
            toast.success('Registration successful!');
            navigate('/login');
         } catch (error) {
            toast.error('Registration failed. Please try again.');
         }
      }
   };

   return (
      <>
         <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
         <h1 className='text-center fw-semibold my-4'>Register Form</h1>
         <div className="container d-flex justify-content-center m-auto">
            <div className="card p-4" style={{ "width": "40rem" }} >
               <form onSubmit={handleSubmit}>
                  <div className="col-md-12 mb-3">
                     <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                  </div>
                  <div className="row">
                     <div className="col-md-6 mb-3">
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                     </div>
                     <div className="col-md-6 mb-3">
                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-6 mb-3">
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                     </div>
                     <div className="col-md-6 mb-3">
                        <input type="password" className="form-control" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirm Password" />
                     </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                     <button className="btn btn-primary" type="submit">Register</button>
                     <a href="/login" className="btn btn-link align-self-center">Login</a>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default RegistrationForm;
