import React, { useEffect, useState } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#ffc0cb", "#ff7f50", "#00bfff", "#ffa07a", "#7fffd4", "#a9a9a9", "#32cd32", "#f0e68c", "#ba55d3", "#ffd700"];



function MyPieChart({ Data, chartData, heading, keyElement }) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize(); 
        window.addEventListener("resize", handleResize); 

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const renderLegendItem = (value, entry) => {
        const fontSize = isMobile ? "7px" : "15px";
        return <span style={{ fontSize }}>{value}</span>;
    };
    return (
        <div className="border mb-16 pb-10">
            <div className='w-8/12 mx-auto text-center md:text-2xl mt-2 -mb-20'>
                <span className='text-[#9e9ad3] font-semibold'>{heading}
                </span>
            </div>
            <div className="graph">
                <ResponsiveContainer>
                    <PieChart width={400} height={300} className="w-5" margin={{ top: 50, bottom: 50 }} >
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey={keyElement}
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            fill="#8884d8"
                            label
                            animationDuration={2000}
                        >
                            {Data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} formatter={renderLegendItem} />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MyPieChart