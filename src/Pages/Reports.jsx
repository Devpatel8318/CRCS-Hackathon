import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
let { data } = require('../Attachement -dummydataset.json');




function Reports() {
  const [books, setBooks] = useState(data);
  // const [filterData,setFilterData] = useState(data);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const [rows, setRows] = useState(15);
  const [keyword, setKeyword] = useState("");
  const halfSize = data.length / 2;
  const Rows = [15, 20, halfSize, data.length];
  const [sortBy, setSortBy] = useState("a");
  const [state, setState] = useState('all');
  const allStatesOfIndia = ["ANDHRA PRADESH", "ANDAMAN AND NICOBAR", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHANDIGARH", "CHHATTISGARH", "DADA AND NAGAR HAVELI", "DAMAN AND DIU", "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JAMMU AND KASHMIR", "JHARKHAND", "KARNATAKA", "KERALA", "LAKSHADWEEP", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM", "NAGALAND", "NEW DELHI", "ODISHA", "PONDICHERRY", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL"];

  const renderOptions = () => {
    return Rows.map((row) => <option key={row}>{row}</option>);
  };

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setRows(selectedValue);
  };

  useEffect(() => {
    currentPage.current = 1;
    if (rows) {
      getPaginatedUsers();
    }
  }, [rows]);

  function handlePageClick({ selected }) {
    currentPage.current = selected + 1;
    getPaginatedUsers();
  }

  function getPaginatedUsers() {
    const allUsers = data; // Replace `data` with your actual array of books

    const pageSize = rows;
    const startIndex = (currentPage.current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedBooks = allUsers.slice(startIndex, endIndex);

    setPageCount(Math.ceil(allUsers.length / pageSize));
    setBooks(paginatedBooks);
  }

  useEffect(() => {
    if (keyword) {
      const filteredBooks = data.filter(book => {
        return book["Name of Society"].toLowerCase().includes(keyword.toLowerCase());
      });
      const pageCount = Math.ceil(filteredBooks.length / rows);
      setPageCount(pageCount);
      const startIndex = (currentPage.current - 1) * rows;
      const endIndex = startIndex + rows;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
      setBooks(paginatedBooks);
    } else {
      getPaginatedUsers();
    }
  }, [keyword, rows, currentPage.current]);

  const sortBooks = (type) => {

    if (sortBy === "a") {
      setSortBy("z");
    }
    if (sortBy === "z") {
      setSortBy("a");
    }
    const bookList = [...books];

    bookList.sort((a, b) => {
      console.log(type);
      if (a[type] < b[type]) {
        return sortBy === "a" ? -1 : 1;
      }
      if (a[type] > b[type]) {
        return sortBy === "a" ? 1 : -1;
      }
      return 0;
    });

    setBooks(bookList);
  };

  useEffect(() => {
    console.log("useEffect called");
    console.log(state);

    if (state !== 'all') {
      const filteredBooks = data.filter(book => {
        return book["State"].toLowerCase().includes(state.toLowerCase());
      });
      console.log('====================================');
      console.log(filteredBooks);
      console.log('====================================');
      const pageCount = Math.ceil(filteredBooks.length / rows);
      setPageCount(pageCount);
      const startIndex = (currentPage.current - 1) * rows;
      const endIndex = startIndex + rows;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
      setBooks(paginatedBooks);
    } else {
      getPaginatedUsers();
    }
  }, [state]);





  const paginateCSS = "rounded-full sm:p-4 sm:h-2 sm:w-2 p-2 h-2 w-2 text-sm flex items-center justify-center ";

  return (
    <div className=''>
      <div className='w-8/12 mx-auto text-center md:text-4xl mt-2 md:mt-6'>
        <span className='text-gray-700 font-semibold'>Reports
        </span>
      </div>

      <div className="xs:w-11/12   mx-1 flex justify-between items-center hide-scrollbar-lg text-right xs:mx-auto overflow-scroll mb-2 md:mb-3">
        <div className='w-3/12 md:w-3/12 '>
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search.."
            className="h-[100%] ml-1 w-full text-[10px] md:text-sm py-0 xs:py-1 px-2 md:p-2"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>

        <div className='flex justify-center items-center'>
          <div>
            <span className='text-gray-600 mx-1 text-sm md:text-lg'> Sort: </span>
          </div>
          <select onChange={(e) => setState(e.target.value)}  value={state} className='border w-full text-gray-600  md:h-9  text-[10px] md:text-sm py-0 xs:py-1 px-2 md:p-2' defaultValue={'all'} >
            <option value={"all"}>--select state--</option>
            {allStatesOfIndia.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="xs:w-11/12 mx-1 hide-scrollbar-lg  xs:mx-auto overflow-scroll bg-white shadow-md">
        <table className="w-full border text-left max-w-full" >
          <thead className='border bg-green-100'>
            <tr className='border-b mx-1'>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>Sr. No.</th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>
                <button onClick={() => sortBooks("Name of Society")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                  <div>
                    Society
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                </button></th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>
                <button onClick={() => sortBooks("State")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                  <div>
                    State
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                </button>
              </th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>
                <button onClick={() => sortBooks("Area of Operation")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                  <div>
                    Area of Operation
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                </button>
              </th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>
                <button onClick={() => sortBooks("Address")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                  <div>
                    Address
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                </button>
              </th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>
                <button onClick={() => sortBooks("Sector Type")} className='flex flex-col justify-center items-center w-1/2 mx-auto'>
                  <div className=''>
                    Sector
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 md:w-6 h-2 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className="border-b text-gray-800" key={book["Sr. No."]}>
                <td className="p-1 sm:p-2 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[5px] xs:text-[8px] md:text-sm "><div >{book["Sr. No."]}</div></td>
                <td className="p-1 sm:p-2 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[5px] xs:text-[8px] md:text-sm "><div>{book["Name of Society"]}</div></td>
                <td className="p-1 sm:p-2 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[5px] xs:text-[8px] md:text-sm "><div>{book["State"]}</div></td>
                <td className="p-1 sm:p-2 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[5px] xs:text-[8px] md:text-sm "><div>{book["Address"]}</div></td>
                <td className="p-1 sm:p-2 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[5px] xs:text-[8px] md:text-sm "><div>{book["Area of Operation"]}</div></td>
                <td className="p-1 sm:p-2 font-medium font-montserrat sm:font-openSans sm:font-normal md:p-3 border text-clip overflow-hidden text-left text-[5px] xs:text-[8px] md:text-sm "><div>{book["Sector Type"]}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center w-11/12 mx-auto text-center  mt-1 p-3 text-sm">
        <div>
          <div className='text-sm md:text-lg'>
            Total Societies: {data.length}
          </div>
        </div>
        <div>
          <div className='text-sm md:text-lg'>
            Rows per page:
          </div>
          <select className="ml-2 text-sm md:text-lg" onChange={handleSelectChange}>
            {renderOptions()}
          </select>
        </div>
      </div>
      <ReactPaginate
        nextLabel=">"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="<"
        pageRangeDisplayed="1"
        marginPagesDisplayed="1"
        containerClassName="pagination justify-content-center pagination-lg"
        pageClassName={paginateCSS}
        pageLinkClassName={paginateCSS}
        previousClassName={paginateCSS}
        previousLinkClassName={paginateCSS}
        nextClassName={paginateCSS}
        nextLinkClassName={paginateCSS}
        activeClassName={"text-white bg-rose-500 " + paginateCSS}
        className=' flex mb-6 items-center justify-center gap-5  mt-1 text-xs'
      />


      <div className='custom-background'>

      </div>
    </div>


  )
}


export default Reports  
