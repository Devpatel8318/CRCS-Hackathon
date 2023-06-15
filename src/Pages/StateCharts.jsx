import { Tooltip } from "flowbite";
import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, YAxis, Legend } from "recharts";

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

console.log(stateArray);

const sectorOccurrences = data.reduce((acc, obj) => {
  const sectorType = obj["Sector Type"];
  acc[sectorType] = acc[sectorType] ? acc[sectorType] + 1 : 1;
  return acc;
}, []);

const sectorArray = Object.entries(sectorOccurrences).map(([sectorType, count]) => ({
  sectorType,
  count
}));

console.log(sectorArray);

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y}
      dy={0}
      textAnchor="end"
      fill="#000000" // Adjust the color if needed
      fontSize={10} // Adjust the font size as desired
      transform={`rotate(-90 ${x},${y})`} // Rotate the label by 20 degrees
    >
      {payload.value}
    </text>
  );
};

export default function StateCharts() {
  return (
    <div className=" mx-2 sm:mx-6 md:mx-16">


      <div  className="border mt-2 mb-4">
        <div className='w-8/12 mx-auto text-center md:text-2xl mt-4 -mb-8'>
          <span className='text-[#9e9ad3]  font-semibold'>Number Of Society per State
          </span>
        </div>

        <div className="graph">
          <ResponsiveContainer>
            <BarChart width={150} height={40} data={stateArray} margin={{ top: 20, bottom: 85}}>
              <Bar dataKey="count" fill="#8884d8" label={{ position: 'top' }} />
              <XAxis dataKey="state" tick={<CustomizedAxisTick />} interval={0} />
              <Label value="Pages of my website" offset={0} position="insideBottom" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>



      <div className="border mb-16">
        <div className='w-8/12 mx-auto text-center md:text-2xl mt-2 -mb-20'>
          <span className='text-[#9e9ad3] font-semibold'>Number Of Society per Type
          </span>
        </div>
        <div className="graph">
          <ResponsiveContainer>
            <BarChart width={150} height={40} data={sectorArray} margin={{bottom: 100 }}>
              <Bar dataKey="count" fill="#8884d8" label={{ position: 'top' }} />
              <XAxis dataKey="sectorType" tick={<CustomizedAxisTick />} interval={0} />
              <Label value="Pages of my website" offset={0} position="insideBottom" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}