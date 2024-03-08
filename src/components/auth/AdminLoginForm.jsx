// AdminLoginForm.jsx
import React, { useState } from 'react';
import axios from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const AdminLoginForm = () => {
  const navigate = useNavigate();
const dispatch = useDispatch()
  const [error, setError] = useState(null); // New state to store the error message
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('hiiiii')
      const response = await axios.post('/customadmin/admin-login/', formData);
      console.log(response.data,'datat');
      const { token, user_email } = response.data;
      console.log('Access Token:', token.access);

      // Store the admin authentication tokens in local storage
      localStorage.setItem('adminToken', token.access);
      localStorage.setItem('adminEmail', user_email);
      console.log(user_email)
      console.log('successss')
      
      // Redirect to the admin dashboard after successful login
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Admin login failed:', error.response.data);
      setError('Invalid email or password. Please try again.'); // Set the error message

    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
          AdminPanel
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your admin account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="admin@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  
                </div>
               
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginForm;
