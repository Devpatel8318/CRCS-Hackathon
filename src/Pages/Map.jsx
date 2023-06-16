import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile, scaleLinear } from 'd3-scale';

import ReactTooltip from 'react-tooltip';
import LinearGradient from './LinearGradient.js';
import './map.css';

const INDIA_TOPO_JSON = require('./india.topo.json');
const { data } = require('../Attachement -dummydataset.json');

const stateOccurrences = data.reduce((acc, obj) => {
  const state = obj["State"];
  acc[state] = acc[state] ? acc[state] + 1 : 1;
  return acc;
}, []);

const stateArray = Object.entries(stateOccurrences).map(([state, count]) => ({
  state,
  count
}));

const stateCodes = [
  { id: 'AP', state: 'Andhra Pradesh' },
  { id: 'AR', state: 'Arunachal Pradesh' },
  { id: 'AS', state: 'Assam' },
  { id: 'BR', state: 'Bihar' },
  { id: 'CT', state: 'Chhattisgarh' },
  { id: 'GA', state: 'Goa' },
  { id: 'GJ', state: 'Gujarat' },
  { id: 'HR', state: 'Haryana' },
  { id: 'HP', state: 'Himachal Pradesh' },
  { id: 'JH', state: 'Jharkhand' },
  { id: 'KA', state: 'Karnataka' },
  { id: 'KL', state: 'Kerala' },
  { id: 'MP', state: 'Madhya Pradesh' },
  { id: 'MH', state: 'Maharashtra' },
  { id: 'MN', state: 'Manipur' },
  { id: 'ML', state: 'Meghalaya' },
  { id: 'MZ', state: 'Mizoram' },
  { id: 'NL', state: 'Nagaland' },
  { id: 'OR', state: 'Odisha' },
  { id: 'PB', state: 'Punjab' },
  { id: 'RJ', state: 'Rajasthan' },
  { id: 'SK', state: 'Sikkim' },
  { id: 'TN', state: 'Tamil Nadu' },
  { id: 'TG', state: 'Telangana' },
  { id: 'TR', state: 'Tripura' },
  { id: 'UT', state: 'Uttarakhand' },
  { id: 'UP', state: 'Uttar Pradesh' },
  { id: 'WB', state: 'West Bengal' },
  { id: 'WB', state: 'West Bengal' },
  { id: 'AN', state: 'Andaman and Nicobar Islands' },
  { id: 'CH', state: 'Chandigarh' },
  { id: 'DN', state: 'Dadra and Nagar Haveli' },
  { id: 'DD', state: 'Daman and Diu' },
  { id: 'DL', state: 'Delhi' },
  { id: 'JK', state: 'Jammu and Kashmir' },
  { id: 'LA', state: 'Ladakh' },
  { id: 'LD', state: 'Lakshadweep' },
  { id: 'PY', state: 'Puducherry' },
];

const heatMap = stateCodes.map(stateCode => {
  const stateData = stateArray.find(state => state.state.toUpperCase() === stateCode.state.toUpperCase());
  const count = stateData ? stateData.count : 0;
  return { id: stateCode.id, state: stateCode.state, value: count };
});

const removeDuplicates = (arr) => {
  const uniqueIds = [];
  const result = [];

  for (const obj of arr) {
    if (!uniqueIds.includes(obj.id)) {
      uniqueIds.push(obj.id);
      result.push(obj);
    }
  }

  return result;
};

const FinalData = removeDuplicates(heatMap);


const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937]
};

const COLOR_RANGE = [
  '#faeded',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#faeded';


const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

function Map() {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(FinalData);
  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  console.log(gradientData);


  let colorScale;
  if (data.some(d => d.value === 0)) {
    colorScale = scaleQuantile()
      .domain(data.map(d => d.value).filter(value => value !== 0))
      .range([COLOR_RANGE[0], ...COLOR_RANGE.slice(1)]);
  } else {
    colorScale = scaleQuantile()
      .domain(data.map(d => d.value))
      .range(COLOR_RANGE);
  }

  const onMouseEnter = (geo, current = { value: '0' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const isMobile = window.innerWidth <= 576;

  return (
    <div className=" grow mb-2 overflow-hidden">
      <h1 className="center text-2xl  mt-2 md:mt-4 font-poppins -mb-5">Number of Societies per State</h1>
      <ReactTooltip >{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={isMobile ? 250 : 600}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              const current = data.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <LinearGradient data={gradientData} />
    </div>
  );
}

export default Map;
