import React, { useEffect, useRef, useState } from 'react'
import 'flowbite';
import { Link, useLocation } from 'react-router-dom';
import satyamev_jayate from '../images/satya.png'


function Header() {
    const [dropdown, setDropDown] = useState(false);
    const [hamburger, setHamburger] = useState(false);

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

    const active = "   py-2 pl-3 pr-4 text-white    bg-orange-500 rounded md:bg-transparent md:text-orange-400 md:p-0 md:border-0 font-bold text-lg";
    const inactive =" py-2 pl-3 pr-4 text-gray-800               rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 text-lg font-bold  md:hover:text-green-800 md:p-0 ";
    return (
        <nav className="bg-white  border-gray-200">
            <div className="max-w-screen px-8 flex flex-wrap items-center justify-between">
                <Link to={'/'} className="flex items-center">
                    <img src={satyamev_jayate} className="w-14 mr-3" alt="satyamev jayate" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase ">
                        The Central Registrar <br />
                        for Cooperative Societies
                    </span>
                </Link>


                <button data-collapse-toggle="navbar-dropdown" onClick={() => setHamburger(!hamburger)} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-dropdown" aria-expanded="false">

                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>

                </button>

                {/* Hamburger */}
                <div className={getHamBurgerStyle()} id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:py-2">

                        <li>
                            <Link to={'/'} className={(path === "" ? active : inactive) + " block "} aria-current="page">Home</Link>
                        </li>

                        <li className=' relative'>
                            {/* <button ref={targetRefDropDown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" onClick={() => setDropDown(!dropdown)} className=" flex items-center justify-between w-full       py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto ">Dropdown */}
                            <button ref={targetRefDropDown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" onClick={() => setDropDown(!dropdown)}  className={(path === "dropdown" ? active : inactive) + "  md:w-auto flex items-center justify-between w-full"}>Dropdown
                                <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <div id="dropdownNavbar" className={getDropDownStyle()}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link to={'/'} className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="block px-4 py-2 hover:bg-gray-100">Earnings</Link>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <Link to={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</Link>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link to={'/services'} className={(path === "services" ? active : inactive) + " block "}>Services</Link>
                        </li>
                        <li>
                            <Link to={'/pricing'} className={(path === "pricing" ? active : inactive) +  " block "}>Pricing</Link>
                        </li>
                        <li>
                            <Link to={'/contact'} className={(path === "contact" ? active : inactive) + " block "}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header