import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../redux/slices/userSlice';
export const UserDropDown = () => {
const dispatch = useDispatch()
 const handleManageProfile = () => {
    // Handle "Manage Profile" action
    onClose();
  };
    const handleWallets = () => {
        // Handle "Wallets" action
        onClose();
      };
    
      const handleSaved = () => {
        // Handle "Saved" action
        onClose();
      };
    
      const handleBookings = () => {
        // Handle "Bookings" action
        onClose();
      };



const handleLogout = () => {
  // Remove token and username from localStorage
  localStorage.clear()
  dispatch(setAuthentication(false));


  // ... other logout logic
};
    
  return (
    <div class="relative inline-block text-left">
      <div class="absolute right-0 -top-4 z-10 w-56 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class=" " role="none">
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-0">Notification
          </a>
          <Link className='hover:bg-blue-600 text-gray-700 block px-4 py-2 text-sm hover:text-white' to="/user/profile" > Profile</Link>
          <Link class="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-2" to="/inbox">Chats</Link>
          <a  onClick={handleLogout} class="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-2">Signout</a>

        </div>
      </div>
    </div>
  )
}
