import React, { useState } from "react";
import Slider from 'react-slider';

const MIN = 100;
const MAX = 1200;

const FilterBox = ({ onChange }) => {
  const [values, setValues] = useState([MIN, MAX]);

  const handleSliderChange = (newValues) => {
    setValues(newValues);
    onChange(newValues); // Trigger the parent component's onChange function
  };

  return (

      <div className="w-full p-8  bg-white border border-gray-400 rounded-md shadow-md">
                <h2 className=' mt-3 font-bold'>Price Range</h2>

        <div className="text-blue-500 font-semibold mb-2">{values[0]} - {values[1]}</div>
        <small className="text-gray-500 text-sm block mb-4">
          Current Range: {values[1] - values[0]}
        </small>
        <Slider
          className="w-full  bg-blue-200 mt-4"
          thumbClassName="w-5 h-5 cursor-grab bg-blue-500 rounded-full border-2 border-blue-500 top-[-8px]"
          trackClassName="h-1 bg-blue-500"
          onChange={handleSliderChange}
          value={values}
          min={MIN}
          max={MAX}
          step={100}
        />
      </div>
   
  );
};

export default FilterBox;
