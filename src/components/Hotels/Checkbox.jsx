import React from 'react';

export const Checkbox = ({ onAmenityChange }) => {
  const handleCheckboxChange = (amenity) => {
    if (onAmenityChange) {
      onAmenityChange(amenity);
    }
  };

  return (
    <div>
      <h2 className='ml-6 mt-3 font-bold'>GroupBy</h2>
      <ul className="max-w-sm flex flex-col">
        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="relative flex items-start w-full">
            <div className="flex items-center h-5">
              <input
                id="hs-list-group-item-checkbox-1"
                name="hs-list-group-item-checkbox-1"
                type="checkbox"
                className="disabled:opacity-50"
                onChange={() => handleCheckboxChange('Wifi')}
              />
            </div>
            <label htmlFor="hs-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
              wifi
            </label>
          </div>
        </li>

        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="relative flex items-start w-full">
            <div className="flex items-center h-5">
              <input
                id="hs-list-group-item-checkbox-2"
                name="hs-list-group-item-checkbox-2"
                type="checkbox"
                className="disabled:opacity-50 dark:checked:bg-blue-500 dark:checked:border-blue-500"
                onChange={() => handleCheckboxChange('Bar')}
              />
            </div>
            <label htmlFor="hs-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600 dark:text-gray-500">
              Bar
            </label>
          </div>
        </li>

        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:text-white">
          <div className="relative flex items-start w-full">
            <div className="flex items-center h-5">
              <input
                id="hs-list-group-item-checkbox-3"
                name="hs-list-group-item-checkbox-3"
                type="checkbox"
                className="disabled:opacity-50 dark:bg-gray-800 dark:checked:bg-blue-500 dark:checked:border-blue-500"
                onChange={() => handleCheckboxChange('Pool')}
              />
            </div>
            <label htmlFor="hs-list-group-item-checkbox-3" className="ms-3.5 block w-full text-sm text-gray-600 dark:text-gray-500">
              Pool
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};
