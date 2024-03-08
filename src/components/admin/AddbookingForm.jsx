import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from '../../Utils/axios';
import { selectAdminId } from '../../redux/store';

export const AddBookingForm = ({ onSubmit }) => {
    const adminUserId = useSelector(selectAdminId);
  console.log(adminUserId,"adminid")
  const adminToken = useSelector((state) => state.admin.token);
  const admin = useSelector((state) => state.admin); // Get searchDetails from Redux store
  console.log(admin.email,'userrrr')
  const [roomTypes, setRoomTypes] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    room_type: '',
    price_per_night: '',
    total_price: 0.0,
    check_in_date: '',
    check_out_date: '',
    user: '',
    hotel: '', // Select input for choosing the hotel
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
 
  useEffect(() => {
    fetchRoomTypes();
    fetchHotels();
    fetchUsers();

  }, []);
  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get('/api/roomtypes/',
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
      );
      setRoomTypes(response.data);
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels/',
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
      );
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/customadmin/user-list/', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/customadmin/bookings/', // Adjust the endpoint URL as per your backend API
        {
            ...formData,
            user: formData.user, // Set the user to the selected user's ID
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log('Booking added:', response.data);
      // Clear form fields after successful submission
      setFormData({
        room_type: '',
        price_per_night: '',
        total_price: 0.0,
        check_in_date: '',
        check_out_date: '',
        user: '',
        hotel: '',
        // Add more fields as needed
      });
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
      <select
  name="user"
  value={formData.user}
  onChange={handleChange}
  placeholder="Select User"
>
  <option value="">Select User</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username} {/* Display the username */}
    </option>
  ))}
</select>

      <select
          name="room_type"
          value={formData.room_type}
          onChange={handleChange}
          placeholder="Room Type"
        >
          <option value="">Select Room Type</option>
          {roomTypes.map((roomType) => (
            <option key={roomType.id} value={roomType.id}>
              {roomType.name}
            </option>
          ))}
        </select>

        {/* Input field for price per night */}
        {/* <input
          type="text"
          name="price_per_night"
          value={formData.price_per_night}
          onChange={handleChange}
          placeholder="Price Per Night"
        /> */}

        {/* Input field for total price */}
        <input
          type="text"
          name="total_price"
          value={formData.total_price}
          onChange={handleChange}
          placeholder="Total Price"
        />

        {/* Input field for check-in date */}
        <input
          type="date"
          name="check_in_date"
          value={formData.check_in_date}
          onChange={handleChange}
          placeholder="Check-in Date"
        />

        {/* Input field for check-out date */}
        <input
          type="date"
          name="check_out_date"
          value={formData.check_out_date}
          onChange={handleChange}
          placeholder="Check-out Date"
        />

        {/* Input field for selecting hotel (you can replace this with a select dropdown) */}
        <select
          name="hotel"
          value={formData.hotel}
          onChange={handleChange}
          placeholder="Select Hotel"
        >
          <option value="">Select Hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>

        {/* Add more input fields as needed */}

        <button type="submit">Add Booking</button>
      </form>
    </>
  );
};
