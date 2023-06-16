import React, { useEffect, useRef, useState } from 'react'
import 'flowbite';
import { Link, useLocation } from 'react-router-dom';
import satyamev_jayate from '../images/satya.png'


function Header() {
    const [dropdown, setDropDown] = useState(false);
    const [hamburger, setHamburger] = useState(true);

    function getDropDownStyle() {
        const dropDownCss = "z-10  font-normal bg-white divide-y absolute divide-gray-100 rounded-lg shadow w-44 transition-all duration-75 ";
        return dropdown ? dropDownCss : dropDownCss + "  opacity-0 pointer-events-none ";
    }

    function getHamBurgerStyle() {
        const HamburgerCss = "w-full md:block md:w-auto ";
        return hamburger ? HamburgerCss + "hidden" : HamburgerCss + "";
    }

    const targetRefDropDown = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (targetRefDropDown.current && !targetRefDropDown.current.contains(event.target)) {
                setDropDown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);


    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const path = splitLocation[splitLocation.length - 1];
    console.log(path);

    const active = "  py-1 sm:py-2 pl-3 pr-4 text-white    bg-orange-500 rounded  md:text-orange-500 md:p-0 md:border-0 md:bg-orange-50 md:px-2 md:rounded-md md:text-md text-sm sm:text-sm   lg:text-lg font-medium";
    const inactive = " py-1 sm:py-2 pl-3 pr-4 text-gray-800               rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:px-2 md:rounded-md  md:hover:text-green-800 md:p-0 text-sm sm:text-sm   lg:text-lg font-medium";
    return (
        <nav className="  border-gray-200 pb-2 bg-gradient-to-r from-green-300 via-yellow-50 to-orange-300 ">
            <div className="max-w-screen px-1 sm:px-8 flex flex-wrap items-center justify-between">
                <Link to={'/'} className="flex items-center justify-center">
                    <img src={satyamev_jayate} className="sm:w-14 w-5 mr-3 bg-white mt-2 rounded-xl" alt="satyamev jayate" />
                    <span className="self-center text-[10px] mt-2 xs:text-xs sm:text-md text-gray-800 lg:text-lg font-semibold whitespace-nowrap uppercase ">
                        The Central Registrar <br />
                        for Cooperative Societies
                    </span>
                </Link>


                <button data-collapse-toggle="navbar-dropdown" onClick={() => setHamburger(!hamburger)} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-dropdown" aria-expanded="false">

                    <svg className=" w-3 h-3 sm:w-6 sm:h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>

                </button>

                <div className={getHamBurgerStyle()} id="navbar-dropdown">
                    <ul className="flex flex-col font-medium py-2 md:p-0 gap-2 md:gap-4 md:mr-10 rounded-lg md:flex-row md:mt-0 md:border-0 md:py-2">

                        <li>
                            <Link onClick={() => { setHamburger(true) }} to={'/'} className={(path === "" ? active : inactive) + " block "} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setHamburger(true) }} to={'/reports'} className={(path === "reports" ? active : inactive) + " block "}>All Data</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setHamburger(true) }} to={'/map'} className={(path === "map" ? active : inactive) + " block "} aria-current="page">Map</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setHamburger(true) }} to={'/chart'} className={(path === "chart" ? active : inactive) + " block "}>Charts</Link>
                        </li>
                        <li>
                            <Link onClick={() => { setHamburger(true) }} to={'/perstate'} className={(path === "perstate" ? active : inactive) + " block "}>Tables</Link>
                        </li>
                        {/* <li className=' relative'>
                            <button ref={targetRefDropDown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" onClick={() => setDropDown(!dropdown)} className={(path === "dropdown" ? active : inactive) + "  md:w-auto flex items-center justify-between w-full"}>Maps
                                <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <div id="dropdownNavbar" className={getDropDownStyle()}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link onClick={() => { setHamburger(true) }} to={'/'} className="block px-4 py-2 hover:bg-gray-100">Home</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => { setHamburger(true) }} to={'/reports'} className="block px-4 py-2 hover:bg-gray-100">Reports</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => { setHamburger(true) }} to={'/'} className="block px-4 py-2 hover:bg-gray-100">Earnings</Link>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <Link onClick={() => { setHamburger(true) }} to={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</Link>
                                </div>
                            </div>
                        </li> */}



                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header