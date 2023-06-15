import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
let { data } = require('../Attachement -dummydataset.json');




function Reports() {
  const [books, setBooks] = useState(data);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const [rows, setRows] = useState(15);
  const [keyword, setKeyword] = useState("");
  const halfSize = data.length / 2;
  const Rows = [15, 20, halfSize,data.length];
  const [sortBy, setSortBy] = useState();

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

    // Calculate pagination parameters
    const pageSize = rows;
    const startIndex = (currentPage.current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Extract the current page of books from the array
    const paginatedBooks = allUsers.slice(startIndex, endIndex);

    // Update state variables
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

  // function getPaginatedUsers() {
  //   const startIndex = (currentPage.current - 1) * rows;
  //   const endIndex = startIndex + rows;
  //   const paginatedBooks = data.slice(startIndex, endIndex);

  //   setPageCount(Math.ceil(data.length / rows));
  //   setBooks(paginatedBooks);
  // }


  const sortBooks = (e,type) => {

    setSortBy(e.target.value);

    const bookList = [...books];

    bookList.sort((a, b) => {
      if (a["Name of Society"] < b["Name of Society"]) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a["Name of Society"] > b["Name of Society"]) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });

    setBooks(bookList);
  };


  async function deleteBook(id) {
    // swal.fire({
    //   title: 'Are you sure?',
    //   text: `Do you want to Delete Book?`,
    //   showCancelButton: true,
    //   cancelButtonText: 'Cancel',
    //   confirmButtonText: 'Yes Delete!',
    //   reverseButtons: true,
    //   confirmButtonColor: '#f14d54'
    // }).then(async result => {
    //   if (result.isConfirmed) {
    //     try {
    //       await axios.delete(`https://book-e-sell-node-api.vercel.app/api/book?id=${id}`);
    //       window.location.replace('/books');
    //     } catch (error) {
    //       alert(error.response.data.error);
    //     }
    //   }
    // })
  }

  // useEffect(() => {
  //   if (keyword) {
  //     const timer = setTimeout(() => {
  //       axios
  //         .get(
  //           `https://book-e-sell-node-api.vercel.app/api/book?pageSize=3&pageIndex=${currentPage.current}&keyword=${keyword}`
  //         )
  //         .then((res) => {
  //           setPageCount(res.data.result.totalPages);
  //           setBooks(res.data.result.items);
  //         });
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   } else {
  //     getPaginatedUsers();
  //   }
  // }, [keyword]);

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
          <select onChange={sortBooks} value={sortBy} className='border  w-full text-gray-600 h-5 md:h-10  text-[10px] md:text-sm py-0 xs:py-1 px-2 md:p-2' defaultValue={'a-z'} >
            <option disabled></option>
            <option value='a-z'>A-Z</option>
            <option disabled></option>
            <option value='z-a'>Z-A</option>
            <option disabled></option>
          </select>
        </div>

      </div>

      <div className="xs:w-11/12 mx-1 hide-scrollbar-lg  xs:mx-auto overflow-scroll bg-white shadow-md">
        <table className="w-full border text-left max-w-full" >
          <thead className='border bg-green-100'>
            <tr className='border-b mx-1'>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>Sr. No.</th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>Name Of Society</th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>State</th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>Area Of Operation</th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>Address</th>
              <th className='border text-[5px] py-1 sm:py-2 md:py-6 xs:text-[10px] md:text-base text-center'>Sector Type</th>
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
      <div className="flex justify-end items-center w-11/12 mx-auto text-center  mt-1 p-3 text-sm">
        <div className='text-sm md:text-lg'>
          Rows per page:
        </div>
        <select className="ml-2 text-sm md:text-lg" onChange={handleSelectChange}>
          {renderOptions()}
        </select>
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
