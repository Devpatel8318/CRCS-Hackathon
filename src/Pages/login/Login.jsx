import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./login.css";
import StateCitySelector from '../StateCitySelector';
const allTypes = ["Agro", "Construction", "Consumer", "Cooperative Bank", "Credit", "Dairy", "Federation", "Fisheries", "Health/Hospital", "Housing", "Industrial/Textile", "Marketing", "Multi Purpose", "National Federation", "Others", "Technical", "Tourism", "Transport", "Welfare"]


// input[type="text"] ,input[type="tel"] , input[type="password"],input[type="number"] ,textarea, input[type="email"]{
//     @apply w-full border my-1 rounded-xl p-3
// }
// .myButton{
//     @apply bg-gray-300
// }
// .myButton.primary{
//     @apply bg-orange-500 p-2 w-full text-white rounded-xl;
// }


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [type, setType] = useState('all');

    //Function is ready just provide CRCS api link
    // async function userLogin(ev) {
    //     try {
    //         ev.preventDefault();
    //         const req = await fetch("https://CRCS/login", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": true,
    //             },
    //             body: JSON.stringify({
    //                 email: email,
    //                 password: password
    //             }),
    //         });
    //         const data = await req.json();
    //         if (data.mymessage === "ok") {
    //             const userDoc = data.userDoc;
    //             alert("Logged In")
    //         }
    //         else {
    //             alert(data.mymessage);
    //         }
    //     }
    //     catch (e) {
    //         alert("Login Failed");
    //     }
    // }

    const [active, setActive] = useState(true);
    const activeCss = "gap-1 inline-flex justify-center items-center px-2 md:px-6 py-2 md:py-2 text-white rounded-md bg-orange-500"
    const inActiveCss = "gap-1  inline-flex justify-center items-center px-2 md:px-6 py-2 md:py-2  rounded-md bg-gray-200 text-gray-600"


    return (
        <div className="flex min-h-[80vh] mx-4 justify-around mt-4 grow ">
            <div className='h-full'>

                <nav className='flex flex-row justify-center w-10/12 mx-auto sm:w-full gap-2 mt-1 mb-2 text-sm sm:text-sm md:text-base'>
                    <button onClick={() => setActive(true)} className={active ? activeCss : inActiveCss} to={'/account'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                        Login
                    </button>
                    <button onClick={() => setActive(false)} className={active ? inActiveCss : activeCss} to={'/account/bookings'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Register
                    </button>
                </nav>

                {active && (
                    <div className="mt-10">
                        <h1 className="mb-4 text-4xl text-center">Login</h1>
                        {/* For future */}
                        {/* <form onSubmit={ev => userLogin(ev)} className="max-w-md mx-auto"> */}
                        <form className="max-w-md mx-auto">
                            <input className='w-full border my-1 rounded-lg p-3' type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="your@gmail.com" />
                            <input className='w-full border my-1 rounded-lg p-3' type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="password" />
                            <button className="mt-3   bg-orange-500 p-2 w-full text-white rounded-lg">Login</button>
                        </form>
                    </div>
                )}



                {!active && (
                    <div className=" mt-4 sm:mt-7 md:mt-10 min-w-[90vw] sm:min-w-[70vw] md:min-w-[50vw]">
                        <h1 className=" text-4xl text-center">Register</h1>
                        {/* For future */}
                        {/* <form onSubmit={ev => userLogin(ev)} className="max-w-md mx-auto"> */}
                        <form className="mx-auto mb-16">
                            <StateCitySelector
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                className=""
                            />

                            <div className=' flex gap-1 sm:gap-3 md:gap-4 mb-2'>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Sector Type: </h2>
                                    <select onChange={(e) => {
                                        setType(e.target.value);
                                    }} className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' defaultValue={'all'} >
                                        <option disabled value={"all"}>Sector Type</option>
                                        {allTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Agro Name: </h2>
                                    <select className='w-full text-sm sm:text-base border my-1 rounded-lg p-2  sm:p-3' value={selectedCity}>
                                        <option disabled value="">Agro Name</option>
                                        <option value="">Data Not Provided for Hackathon</option>
                                    </select>
                                </div>
                            </div>

                            <h2 className='text-sm sm:text-md md:text-xl mt-4 text-gray-600'>Address: </h2>
                            <textarea className='w-full mb-4 border mt-2 rounded-md p-3' placeholder='Complete Registered Address (with PIN code)' />

                            <div className=' flex gap-1 sm:gap-3 md:gap-4 mb-2'>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt- 4'>PAN NO: </h2>
                                    <input type="number" className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='Please Enter PAN No.' />
                                </div>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt- 4'>TAN NO: </h2>
                                    <input type="number" className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='Please Enter TAN NO.' />
                                </div>
                            </div>


                            <div className=' flex gap-1 sm:gap-3 md:gap-4 mb-2'>


                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-md sm:text-sm sm:text-md md:text-xl mt-4'>Name of Chairman: </h2>
                                    <input type="text" className='w-full text-xs sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='Name of MD/Chairman/Vice Chairman' />
                                </div>

                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Designation: </h2>
                                    <select className='w-full text-sm sm:text-base border my-1 rounded-lg p-2  sm:p-3' value={selectedCity}>
                                        <option value="" disabled>Select Designation</option>
                                        <option value="CH">Chairman/ President</option>
                                        <option value="VCH">Vice Chairman/Vice President</option>
                                        <option value="CEO">Managing Director/ CEO</option>
                                        <option value="COOD">Co-Opted Director</option>
                                    </select>
                                </div>

                            </div>

                            <div className=' flex gap-1 sm:gap-3 md:gap-4 mb-2'>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Mobile No.</h2>
                                    <input type="number" className='w-full  text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='Mobile No. of Authorized Officer' />
                                </div>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Email ID: </h2>
                                    <input type="email" className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='Email ID' />
                                </div>
                            </div>

                            <div className=' flex gap-1 sm:gap-3 md:gap-4 mb-2'>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4 opacity-0'>d</h2>
                                    <div className='opacity-0 w-1/2 text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' />
                                </div>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Service Tax: </h2>
                                    <input type="email" className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='Service Tax Number:' />
                                </div>
                            </div>

                            <div className=' flex gap-1 sm:gap-3 md:gap-4 mb-2'>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Password: </h2>
                                    <input type="password" className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='password' /></div>
                                <div className='w-1/2 text-gray-600'>
                                    <h2 className='text-sm sm:text-md md:text-xl mt-4'>Confirm-Password: </h2>
                                    <input type="password" className='w-full text-sm sm:text-base border my-1 rounded-lg p-2 sm:p-3' placeholder='confirm password' /></div>
                            </div>

                            <button className="mt-4 bg-orange-500 p-3 w-full text-white rounded-lg">Register</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login