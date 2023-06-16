import React, { useState } from 'react'
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

function PerState() {
    const [books, setBooks] = useState(stateArray);
    const [sector, setSector] = useState(sectorArray);

    const [sortBy, setSortBy] = useState("a");
    const [sortBy2, setSortBy2] = useState("a");


    function sortBooks(x) {
        if (sortBy === "a") {
            setSortBy("z");
        }
        if (sortBy === "z") {
            setSortBy("a");
        }
        const bookList = [...books];

        bookList.sort((a, b) => {
            if (a["count"] < b["count"]) {
                return sortBy === "a" ? -1 : 1;
            }
            if (a["count"] > b["count"]) {
                return sortBy === "a" ? 1 : -1;
            }
            return 0;
        });
        setBooks(bookList);
    }

    function sortBooks2(x) {
        if (sortBy2 === "a") {
            setSortBy2("z");
        }
        if (sortBy2 === "z") {
            setSortBy2("a");
        }
        const bookList = [...sector];

        bookList.sort((a, b) => {
            if (a["count"] < b["count"]) {
                return sortBy2 === "a" ? -1 : 1;
            }
            if (a["count"] > b["count"]) {
                return sortBy2 === "a" ? 1 : -1;
            }
            return 0;
        });
        setSector(bookList);
    }

    function sortBooks(x) {
        if (sortBy === "a") {
            setSortBy("z");
        }
        if (sortBy === "z") {
            setSortBy("a");
        }
        const bookList = [...books];

        bookList.sort((a, b) => {
            if (a["count"] < b["count"]) {
                return sortBy === "a" ? -1 : 1;
            }
            if (a["count"] > b["count"]) {
                return sortBy === "a" ? 1 : -1;
            }
            return 0;
        });
        setBooks(bookList);
    }

    return (
        <div className=" w-10/12 sm:w-9/12 md:w-10/12 lg:w-5/12 mx-auto text-gray-800 overflow-hidden">
            <div className='w-8/12 mx-auto text-center md:text-2xl mt-4 mb-1'>
                <span className='text-orange-500 font-semibold font-poppins'>Number Of Society per State
                </span>
            </div>
            <table className="w-full border text-left max-w-full mb-6 shadow-md " >
                <thead className='border bg-orange-200'>
                    <tr className='border-b mx-1'>
                        <th className='border  py-1 sm:py-2 md:py-2 text-[10px] md:text-base text-center'>Society Name</th>
                        <th className='border  py-1 sm:py-2 md:py-2 text-[10px] md:text-base text-center'>
                            <button onClick={() => sortBooks("count")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                                <div>
                                    Number
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </button>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {books?.map((book) => (
                        <tr className="border-b text-gray-800" key={book.state}>
                            <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[8px] md:text-sm "><div >{book.state}</div></td>
                            <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[8px] md:text-sm "><div>{book.count}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className='w-8/12 mx-auto text-center md:text-2xl mt-10 mb-1'>
                <span className='text-orange-500 font-semibold font-poppins'>Number Of Society per Type
                </span>
            </div>
            <table className="w-full border text-left max-w-full mb-6 shadow-md " >
                <thead className='border bg-orange-200'>
                    <tr className='border-b mx-1'>
                        <th className='border  py-1 sm:py-2 md:py-2 text-[10px] md:text-base text-center'>Society Name</th>
                        <th className='border  py-1 sm:py-2 md:py-2 text-[10px] md:text-base text-center'>
                            <button onClick={() => sortBooks2("count")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                                <div>
                                    Number
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </button>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {sector?.map((book) => (
                        <tr className="border-b text-gray-800" key={book.state}>
                            <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[8px] md:text-sm "><div >{book.sectorType}</div></td>
                            <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[8px] md:text-sm "><div>{book.count}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default PerState