import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Label,
    LabelList,
    Legend
} from "recharts";

const { data } = require('../Attachement -dummydataset.json');
const stateData = {};
data.forEach(item => {
    const State = item.State;
    const SectorType = item["Sector Type"];

    if (!stateData.hasOwnProperty(State)) {
        stateData[State] = {};
    }

    if (SectorType !== undefined) {
        if (stateData[State].hasOwnProperty(SectorType)) {
            stateData[State][SectorType]++;
        } else {
            stateData[State][SectorType] = 1;
        }
    }
});
const newStateData = Object.keys(stateData).map(State => {
    const sectorTypes = stateData[State];
    return {
        State,
        ...sectorTypes
    };
});
const filteredStateData = newStateData.filter(obj => Object.keys(obj).length > 1);

const sectorTypesArray = [];
filteredStateData.forEach(obj => {
    Object.keys(obj).forEach(key => {
        if (key !== "State") {
            if (!sectorTypesArray.includes(key)) {
                sectorTypesArray.push(key);
            }
        }
    });
});

const colors = ['#dd7876', '#82ba7f', '#76a8dd', '#f4ca64', '#ab9df2', '#f2938c', '#8cccb9'];

const renderCustomizedLabel = (props) => {
    const { content, ...rest } = props;

    return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />;
};
const bars = sectorTypesArray.map((sectorType, index) => (
    <Bar key={sectorType} dataKey={sectorType} fill={colors[index % colors.length]} stackId="a">
        <LabelList dataKey={sectorType} position="center" content={renderCustomizedLabel} />
    </Bar>
));

const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
        <text
            x={x}
            y={y}
            textAnchor="end"
            fill="#000000"
            fontSize={9}
        >
            {payload.value}
        </text>
    );
};


const StackedChart = () => {
    const data = [
        { name: "NE Send", completed: 230, failed: 335, inprogress: 453 },
        { name: "NE Resend", completed: 335, failed: 330, inprogress: 345 },
        {
            name: "Miles Orchestrator",
            completed: 537,
            failed: 243,
            inprogress: 2110
        },
        {
            name: "Commissions Payment Orch",
            completed: 132,
            failed: 328,
            inprogress: 540
        },
        {
            name: "Business Integrators",
            completed: 530,
            failed: 145,
            inprogress: 335
        },
        { name: "SmartTrack", completed: 538, failed: 312, inprogress: 110 }
    ];

    return (
        <div className="content mx-4 md:mx-32 c-white d90vh overflow-hidden">
            <div className="w-full h-full">
                <ResponsiveContainer height={"100%"} width={"100%"} >
                    <BarChart
                        layout="vertical"
                        data={filteredStateData}
                        stackOffset="expand"
                        margin={{bottom: 85,left:20,right:20}} 
                        // padding={{}}
                    >
                        <XAxis hide type="number" />
                        <YAxis tick={<CustomizedAxisTick />} type="category" dataKey="State" stroke="#FFFFFF" fontSize="12" />
                        <Tooltip />
                        {bars}
                        <Legend/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StackedChart;






















