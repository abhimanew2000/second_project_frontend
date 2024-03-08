// App.jsx
import React from 'react';
import  {Route, Routes } from 'react-router-dom';
import UserRegisterForm from './components/auth/UserRegisterForm';
import Test from './components/Test';
import UserLoginForm from './components/auth/UserLoginForm';
import AdminLoginForm from './components/auth/AdminLoginForm';
import { AdminHomePage } from './Pages/AdminHomePage';
import HomePage from './Pages/UserHomePage';
import { SearchBar } from './SearchBar';
import HotelList from './Hotellist';
import HotelSlider from './components/Hotels/HotelSlider';
// import { AdminHomePage } from './Pages/AdminHomePage';
import { AdminSidebar } from './components/admin/AdminSidebar';
import HotelSearchPage from './Pages/HotelSearchPage';
import { AdminHotelList } from './Pages/AdminHotelList';
import { DistrictContainer } from './DistrictContainer';
import { UserDetails } from './components/admin/UserDetails';
import { Checkbox } from './components/Hotels/Checkbox';
import { HotelDetailPage } from './Pages/HotelDetailPage';
import { ImagesContainer } from './components/Hotels/ImagesContainer';
import { AdminHotelRoomList } from './Pages/AdminHotelRoomList';
import { HotelCheckoutPage } from './Pages/HotelCheckoutPage';
import HotelBookingSuccessPage from './Pages/HotelBookinSuccessPage';
import { HotelBookingList } from './Pages/HotelBookingList';
import UserProfile from './components/user/UserProfile';
import { UserBookingList } from './components/user/UserBookingList';
import ChangePasswordComponent from './components/user/ChangePassworComponent';
import { SendPasswordResetEmail } from './components/user/SendPasswordResetEmail';
import { ResetPasswordComponent } from './components/user/ResetPasswordComponent';

import {AdminHotelDetails} from './Pages/AdminHotelDetails';
import { RatingFeedbackForm } from './components/Hotels/RatingFeedbackForm';
import MapComponent from './components/admin/MapComponent';
import WishlistPage from './Pages/Wishlist';
import { GoogleAuth } from './components/auth/GoogleAuth';
import { MessageDetail } from './Pages/MessageDetail';
import { SendNotification } from './components/admin/SendNotification';
import { ReceiveNotification } from './components/user/ReceiveNotification';
// import ChatRoom from './components/user/ChatRoom';
import ChatComponent from './components/user/ChatComponent';
import { AdminChatComponent } from './components/admin/AdminChatComponent';
// import PrivateRoute from './redux/PrivateRoute';
const App = () => {
  return (
    <>
    <div className=' font-booking'>
      <Routes  >
          <Route path="/register" element={<UserRegisterForm/>} />
          <Route path='/test' element={<GoogleAuth/>}/>
          <Route path='/booking-list' element={<HotelBookingList/>}/>
          <Route path='/rooms' element={<AdminHotelRoomList/>}/>
          <Route path='/get-hotels' element={<HotelSearchPage/>}/>
          <Route path='/customadmin/hotel-list' element={<AdminHotelList/>}/>
          <Route path="/hotel-search/:city" element={<HotelSearchPage/>} />
          <Route path="/hotels/:hotelId" element={<HotelDetailPage/>} />
          <Route path="/districts" element={<DistrictContainer/>} />
          <Route path="/hotel-booking-success" element={<HotelBookingSuccessPage/>} />
          <Route path="/admin-login" element={<AdminLoginForm/>} />
          <Route path="/hotel-checkout" element={<HotelCheckoutPage/>} />
          <Route path='/login' element={<UserLoginForm />}/>
          <Route path='/admin/login' element={<AdminLoginForm />}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<AdminHomePage/>} />
          <Route path="/admin/user-list" element={<UserDetails/>} />
          <Route path="/admin/hotel-list" element={<AdminHotelList/>} />
          <Route path="/user/profile" element={<UserProfile/>} />
          <Route path="/user/bookings" element={<UserBookingList/>} />
          <Route path="/changepassword" element={<ChangePasswordComponent/>} />
          <Route path="/send-reset-password-email" element={<SendPasswordResetEmail/>} />
          <Route path="/reset-password/:uid/:token" element={<ResetPasswordComponent/>} />
          <Route path="/admin-hotel-details/:hotelId" element={<AdminHotelDetails />} />
          <Route path="/add-rating/:hotelId" element={<RatingFeedbackForm />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          {/* <Route path="/inbox" element={<Message />} /> */}
          <Route path="/inbox/:id" element={<MessageDetail />} />
          <Route path="/send-notification" element={<SendNotification/>} />
          <Route path="/notification" element={<ReceiveNotification/>} />
          <Route exact path="/chat/:bookingId" element={<ChatComponent/>} />
          <Route exact path="/admin/chat"element={<AdminChatComponent/>} />

          {/* <Route path="/notification" element={<NotificationForm/>} /> */}
          

          {/* <PrivateRoute path="/user/bookings" element={<UserBookingList />} /> */}




      </Routes>

    </div>
    </>
  );
};

export default App;
