import React, { useState } from 'react'
import { Bar, BarChart, Cell, Label, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
        <text
            x={x}
            y={y}
            dy={0}
            textAnchor="end"
            fill="#000000" 
            fontSize={10} 
            transform={`rotate(-90 ${x},${y})`}
        >
            {payload.value}
        </text>
    );
};

function Graph({Data,heading,keyElement}) {
    const [focusBar, setFocusBar] = useState(null);
    const [mouseLeave, setMouseLeave] = useState(true);

    return (
        <div className="border mt-4 mb-8">
            <div className='w-8/12 mx-auto text-center md:text-2xl mt-4 -mb-8'>
                <span className='text-[#8982f0]  font-semibold'>{heading}
                </span>
            </div>
            <div className="graph">
                <ResponsiveContainer>
                    <BarChart width={150} height={40} data={Data} margin={{ top: 20, bottom: 85 }} onMouseMove={(state) => {
                        if (state.isTooltipActive) {
                            setFocusBar(state.activeTooltipIndex);
                            setMouseLeave(false);
                        } else {
                            setFocusBar(null);
                            setMouseLeave(true);
                        }
                    }}>
                        <Bar animationDuration={1000} animationEasing="ease-in-out" dataKey="count" fill="#8884d8" label={{ position: 'top' }} >
                            {Data.map((entry, index) => (
                                <Cell key={index}
                                    fill={
                                        focusBar === index || mouseLeave
                                            ? "#7a74e0"
                                            : "rgba(43, 92, 231, 0.2)"
                                    }
                                />
                            ))}
                        </Bar>
                        <XAxis dataKey={keyElement} tick={<CustomizedAxisTick />} interval={0} />
                        <Tooltip cursor={false} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Graph