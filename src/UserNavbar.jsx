// UserNavbar.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import IndianIcon from "./assets/Flag_of_India.svg.png"
import { useNavigate } from 'react-router-dom';
import { UserDropDown } from './components/user/UserDropDown';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export const UserNavbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

    const navigate=useNavigate()
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user); // Assuming you have user details in your Redux state

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');

      dispatch(setAuthentication(false));
      navigate('/login');
    };
    // ------------------------------------------------------------
    const toggleDropdown = () => {
      setDropdownVisible((prevVisible) => !prevVisible);
    };
  
    const closeDropdown = () => {
      setDropdownVisible(false);
    };
  
  return (
    <>
      <nav className=" border-gray-200 h-28  bg-blue-900  z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ">
              Booking.Com
            </span>
          </div>
          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            aria-controls="navbar-multi-level"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   ">
              <li>
                
                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent   md:p-0  ">Home</Link>
              </li>
              <li>
                <div className="relative group">
                  <button
                    id="countryDropdownLink"
                    data-dropdown-toggle="countryDropdown"
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                  >
                    <img
                      className="h-6 w-6 rounded-full"
                      src="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/images-flags/In@3x.png"
                      alt="India Flag"
                    />
                  </button>
                  {/* Country Dropdown menu */}
                  <div
                    id="countryDropdown"
                    className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-40 "
                  >
                    <ul className="py-2 text-sm text-gray-700 ">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100    "
                        >
                          {/* Country: India */}
                          <img
                            className="w-4 h-4 ml-1"
                            src="path_to_your_india_image.svg"
                            alt="India Flag"
                          />
                        </a>
                      </li>
                      {/* Add more countries as needed */}
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                >
                  {/* Pricing */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  <i class="fa-solid fa-bell text-xl"></i>
                </a>
              </li>
              {isAuthenticated ? (
                
              <li className='bg-white h-8 py-1 px-3 rounded-sm  z-20'>
                
                <div className="flex items-center " onClick={toggleDropdown}>
                  
                  <span className="text-gray-900">{user.name}</span>
                </div>
                {isDropdownVisible && <UserDropDown onClose={closeDropdown} />}
              </li>
            ) : (
              <>
                <li className='bg-white py-1 px-3 rounded-sm'>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </a>
                </li>
                <li className='bg-white py-1 px-3 rounded-sm'>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                    onClick={() => navigate('/login')}
                    
                  >
                    Sign In
                  </a>
                </li>
              </>
            )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
