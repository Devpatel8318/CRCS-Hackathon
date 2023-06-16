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


  return (
    <div className=" mx-2 sm:mx-6 md:mx-16 overflow-hidden">

      <Graph Data={stateArray} heading={" Number Of Society Per State"} keyElement={"state"} />
      <Graph Data={sectorArray} heading={" Number Of Society Per Sector Type"} keyElement={"sectorType"} />

      <MyPieChart Data={data} keyElement={"state"} chartData={stateArray} heading={"Number Of Society Per State"} />
      <MyPieChart Data={data} keyElement={"sectorType"} chartData={sectorArray} heading={"Number Of Society Per Sector Type"} />
    </div>
  );
}