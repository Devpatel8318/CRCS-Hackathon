import {cityStrings} from '../allData';
import React, { useState } from 'react';

const allStates2 = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"];

const StateCitySelector = ({ selectedState, setSelectedState, selectedCity, setSelectedCity }) => {
    const [index, setIndex] = useState('');

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
        setIndex(allStates2.findIndex((s) => s === event.target.value));
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    return (
        <div className='flex gap-1 sm:gap-3 md:gap-4 mb-2'>
            <div className='w-1/2 text-gray-600'>
                <h2 className='text-sm sm:text-md md:text-xl mt-4'>State: </h2>
                <select className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' value={selectedState} onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {allStates2.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div className='w-1/2 text-gray-600'>
                <h2 className='text-sm sm:text-md md:text-xl mt-4'>City: </h2>
                <select className='w-full text-sm sm:text-base border my-1 rounded-lg p-2  sm:p-3' value={selectedCity} onChange={handleCityChange}>
                    <option value="">Select City</option>
                    {selectedState && cityStrings[index]?.split('|').map((city, index) => (
                        <option key={index} value={city.trim()}>{city.trim()}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default StateCitySelector;










