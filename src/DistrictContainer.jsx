import React from "react";
import { useNavigate } from "react-router-dom";
export const DistrictContainer = () => {
  const navigate = useNavigate();

  const handleClick = (city) => {
    navigate(`/get-hotels/?city=${city}`);
  };
  return (
    <>
    <div className="mt-20 px-32">
      <h2 className="text-2xl font-bold mb-5">Popular Destinations </h2>
      <div class="container    grid grid-rows-2">
        
        
        <div class="grid grid-cols-2 gap-4 h-72 mb-5">
          <div
            className="bg-gray-200 cursor-pointer bg-cover flex rounded-lg"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/8/8f/Kochi_Skyline.jpg')",
            }}
            onClick={() => handleClick("Ernakulam")}
          >
            <h1 className="m-auto text-white font-bold text-2xl cursor-pointer">
              Ernakulam
            </h1>
          </div>

          <div
            className="cursor-pointer bg-gray-200 bg-cover flex  rounded-lg bg-[url('https://lh5.googleusercontent.com/p/AF1QipPU0GD2FeJ4Jl9k17okiDCCTegsA6NO0KxEsQTG=w675-h390-n-k-no')] "
            onClick={() => handleClick("Wayanad")}
          >
            <h1 className="m-auto text-white  font-bold text-2xl cursor-pointer">
              Wayanad
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 h-72">
          <div
            className="cursor-pointer bg-gray-200 bg-cover flex  rounded-lg bg-[url('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSxlMYow69ynhDBcoyOKRm54DpXp_zjSQTvr1m67sjOdUq_abMLfuiPOFNkhpIzkdLu3jIIvwq0d_kxxfx6UXi4u2K-FuVoC2vfk1inRQ')]"
            onClick={() => handleClick("Munnar")}
          >
            <h1 className="m-auto text-white font-bold text-2xl cursor-pointer">
              Munnar
            </h1>
          </div>
          <div
            className="cursor-pointer bg-gray-200 bg-cover flex  rounded-lg bg-[url('https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRhE8Vy_t2q-B9bnwnZGQ1XcDevr0XW030n2r_a6UqDE1N60uuSNk2iESA4oVVB9Zv39OnkHS5BMFoAMZmWlx_7mmRHHrogibmJ4DzSvQ')]"
            onClick={() => handleClick("Alappuzha")}
          >
            <h1 className="m-auto text-white font-bold text-2xl cursor-pointer">
              Alappuzha
            </h1>
          </div>
          <div
            className="cursor-pointer bg-gray-200 bg-cover flex  rounded-lg bg-[url('https://lh4.googleusercontent.com/proxy/cnt7a22d1ktcUeE82JrEEVv4h10nlpnCqC2nF63ycuuxiC1XufAV_XeH1kJo6gRQsxv2mVmfe93ctqrXO6IY1-bLWVNW9lgTJsjDWj4fKqb1Qa8P9p6xGcINuylKuTZL-dwU0uvAseV1Te7CSatyvWiODNwgVAA=w675-h390-n-k-no')]"
            onClick={() => handleClick("Trivandrum")}
          >
            <h1 className="m-auto text-white font-bold text-2xl cursor-pointer">
              Trivandrum
            </h1>
          </div>
        </div>
      </div>

    </div>
    </>
  );
};
