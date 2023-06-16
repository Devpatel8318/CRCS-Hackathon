import React from 'react'

function SmallTable({ sortBooks2, sortBooks, heading, data, category }) {
    console.log(category);
    console.log(category === "state");
    console.log(data);
    return (
        <>
            <div className='w-8/12 mx-auto text-center md:text-2xl mt-4 mb-3'>
                <span className='text-orange-500 font-semibold font-poppins'>{heading}
                </span>
            </div>
            <table className="w-full border text-left max-w-full mb-6 shadow-md " >
                <thead className='border bg-orange-200'>
                    <tr className='border-b mx-1'>
                        <th className='border  py-1 sm:py-2 md:py-2 text-[10px] md:text-base text-center'>Sector Type</th>
                        <th className='border  py-1 sm:py-2 md:py-2 text-[10px] md:text-base text-center'>

                            <button onClick={() => {
                                if (category === "state") {
                                    console.log("state");
                                    sortBooks("count");
                                }
                                else {
                                    sortBooks2("count")
                                }
                            }} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
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
                    {data?.map((book) => (
                        <tr className="border-b text-gray-800" key={book.state}>
                            {category === "sectorType" ? (
                                <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[8px] md:text-sm "><div >{book.sectorType}</div></td>
                            ) : (
                                <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[8px] md:text-sm "><div >{book.state}</div></td>
                            )}
                            <td className="p-1 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-center text-[8px] md:text-sm "><div>{book.count}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    )
}

export default SmallTable