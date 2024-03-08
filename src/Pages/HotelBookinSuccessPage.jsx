import React from 'react';
import { UserNavbar } from '../UserNavbar';
import successImage from "../assets/successImage.jpg"
import { Link } from 'react-router-dom';
const HotelBookingSuccessPage = () => {
  return (
   <>
    <UserNavbar/>
        

      
 <section class="relative z-10 bg-primary pt-7 bg-blue-800 h-screen">
   <div class="container mx-auto">
      <div class="-mx-4 flex">
         <div class="w-full px-4">
            <div class="mx-auto  w-fit text-center">
              <div className=' flex justify-center w-full '>
                <img className='w-5/12 rounded-lg' src={successImage} alt="successimage" />

              </div>

               <h2
                  class="mb-2 text-[30px] font-bold leading-none text-white sm:text-[80px] md:text-[50px] whitespace-nowrap"
                  >
                   Booking Success
               </h2>
               <h4
                  class="mb-1 text-[22px] font-semibold leading-tight text-white"
                  >
                   The Hotel Booking is succesfully completed.
               </h4>
               <p class="mb-4 text-lg text-white">
                 Do you wish to see the details?
               </p>
               <Link to='/user/bookings'
                  
                  class="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-blue-800"
                  >
               See Details
               </Link>
            </div>
         </div>
      </div>
   </div>
   <div
      class="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14"
      >
      <div
         class="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"
         ></div>
      <div class="flex h-full w-1/3">
         <div
            class="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"
            ></div>
         <div
            class="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"
            ></div>
      </div>
      <div
         class="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"
         ></div>
   </div>
</section>
</>
      
   );
};

export default HotelBookingSuccessPage;
