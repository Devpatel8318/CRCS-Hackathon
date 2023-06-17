import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile} from 'd3-scale';
import {stateArray , stateCodes} from '../allData';
import ReactTooltip from 'react-tooltip';
import LinearGradient from './LinearGradient.js';
import './map.css';
import StackedChart from './StackedChart.jsx';

const INDIA_TOPO_JSON = require('./india.topo.json');


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
  const [active, setActive] = useState(true);
  const activeCss = "gap-1 inline-flex justify-center items-center px-3 md:px-6 py-2 md:py-2 text-white rounded-md bg-orange-500"
  const inActiveCss = "gap-1  inline-flex justify-center items-center px-3 md:px-6 py-2 md:py-2  rounded-md bg-gray-200 text-gray-600"

  return (


    <>
      <h1 className="text-center text-2xl  mt-2 md:mt-4 font-poppins -mb-5">Number of Societies per State</h1>

      <nav className='flex flex-row justify-center w-10/12 mx-auto sm:w-full gap-2 mt-8 mb-4 text-sm sm:text-sm md:text-base'>
        <button onClick={() => setActive(true)} className={active ? activeCss : inActiveCss} to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          Map
        </button>
        <button onClick={() => setActive(false)} className={active ? inActiveCss : activeCss} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
          Chart
        </button>
      </nav>


      {active && (
        <div className=" grow mb-8 -mt-4 overflow-hidden ">
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
      )}

      {!active && (
        <StackedChart />
      )}


    </>
  );
}

export default Map;
