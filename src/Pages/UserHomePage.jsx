import React from "react";
import { UserNavbar } from "../UserNavbar";
import { SearchBar } from "../SearchBar";
import HotelList from "../Hotellist";
import { DistrictContainer } from "../DistrictContainer";
import { UserFooter } from "../UserFooter";
import findHomesImage from '../assets/findhomes.png';

const HomePage = () => {
  return (
    <div>
      <UserNavbar />
      
      
      <img className=""
      
        src="https://r-xx.bstatic.com/xdata/images/xphoto/2880x868/296661902.jpeg?k=81d5ab638f6a52308efde9aff4e7f4d468ee89a8db0677723edf0ff76410d6ec&o="
        alt=""
      />
      <div className="absolute inset-0  my-52  ml-32  ">

  
        <h1 className="text-white  text-left font-bold text-5xl mb-4">Wanderlust days <br />and cozy nights</h1>
        <h2 className="text-white text-left font-semibold text-2xl">Choose from cabins, houses, and more</h2>
        <button className="col-span-1 bg-blue-500 text-white mt-4 h-12 rounded-xl  px-5 hover:bg-blue-600 focus:outline-none focus:ring ">
              {/* Adjusted yellow border */}
              Search
            </button>

         
      </div>
      <div className="absolute top-[500px] max-w-[1100px] w-[calc(100%-10px)] left-1/2 transform -translate-x-1/2 -translate-y-54 z-3 h-fit">
      <SearchBar/> 

      </div>
      <div className="mt-32 ml-20">
      <img src={findHomesImage} alt="Find Homes" />;      </div>
       <HotelList/>
      <DistrictContainer/>
      <UserFooter/>
      

    </div>
    
  );
};

export default HomePage;
