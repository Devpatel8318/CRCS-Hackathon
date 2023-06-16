import React, { useState } from "react";
import Graph from "../Components/Graph";
import MyPieChart from "../Components/MyPieChart";

let { data } = require('../Attachement -dummydataset.json');

const stateOccurrences = data.reduce((acc, obj) => {
  const state = obj["State"];
  acc[state] = acc[state] ? acc[state] + 1 : 1;
  return acc;
}, []);

const stateArray = Object.entries(stateOccurrences).map(([state, count]) => ({
  state,
  count
}));

const sectorOccurrences = data.reduce((acc, obj) => {
  const sectorType = obj["Sector Type"];
  acc[sectorType] = acc[sectorType] ? acc[sectorType] + 1 : 1;
  return acc;
}, []);

const sectorArray = Object.entries(sectorOccurrences).map(([sectorType, count]) => ({
  sectorType,
  count
}));



export default function StateCharts() {

  const [active, setActive] = useState(true);

  const activeCss = "gap-1 inline-flex justify-center items-center px-2 md:px-6 py-2 md:py-2 text-white rounded-md bg-orange-500"
  const inActiveCss = "gap-1  inline-flex justify-center items-center px-2 md:px-6 py-2 md:py-2  rounded-md bg-gray-200 text-gray-600"

  return (
    <>
      <nav className='flex flex-col sm:flex-row justify-center w-10/12 mx-auto sm:w-full gap-2 mt-8 mb-4 text-sm sm:text-sm md:text-base'>
        <button onClick={() => setActive(true)} className={active ? activeCss : inActiveCss} to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>

          Number Of Society per State
        </button>
        <button onClick={() => setActive(false)} className={active ? inActiveCss : activeCss} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Number Of Society per Sector
        </button>
      </nav>



      <div className=" w-10/12 sm:w-9/12 md:w-10/12 lg:w-5/12 mx-auto text-gray-800 overflow-hidden">
        {active && (
          <>
            <Graph Data={stateArray} heading={" Number Of Society Per State"} keyElement={"state"} />
            <MyPieChart Data={data} keyElement={"state"} chartData={stateArray} heading={"Number Of Society Per State"} />
          </>
        )}

        {!active && (
          <>
            <Graph Data={sectorArray} heading={" Number Of Society Per Sector Type"} keyElement={"sectorType"} />
            <MyPieChart Data={data} keyElement={"sectorType"} chartData={sectorArray} heading={"Number Of Society Per Sector Type"} />
          </>
        )}
      </div>
    </>

    // <div className=" mx-2 sm:mx-6 md:mx-16 overflow-hidden">




    // </div>
  );
}