import React from 'react'

function Index() {
  return (
    <div className='w-full grid lg:grid-cols-10 bg-gradient-to-r from-orange-100 via-white to-green-100'>

      <div className='flex justify-center items-center lg:col-span-4'>
        <img src="https://mscs.dac.gov.in/images/MSCS_LOGO.png" className="lg:h-auto w-[40%] mt-2 lg:w-[50%] object-contain" alt="" />
      </div>

      <div className='m-4 text-gray-800 font-medium lg:col-span-6 flex justify-center items-center flex-col'>
        <div className=' w-full text-left'>
          <h1 className='font-poppins font-bold text-orange-500 text-xl lg:text-3xl lg:text-left text-center mb-6 uppercase'>Central Registrar of Cooperative Societies office</h1>
        </div>
        <p className="font-openSans text-sm md:text-lg font-normal">
          The Central Registrar of Cooperative Societies office is the statutory body responsible for registration and other processes of the MSCS. The Office of CRCS looks after the MSCS in their management, registration, yearly filings, and other regulatory processes.
        </p >
        <br />
        <p className="font-openSans text-sm md:text-lg font-normal">
          As per the nature of the work and issues related to Multi State Cooperative Societies, there is two major sections existing in CRCS office i.e. Registration and Management sections.Registration section looks after the matters relates to registration of new Multi State Cooperative Societies/Banks, deemed registration, conversion of the societies and amendments of the Bye- laws. - The Management sections looks after the issues relates to elections matters, analysis of submitted annual returns & audit reports, complaints received against the registered societies and the liquidation of societies.
        </p>

      </div>
    </div>
  )
}

export default Index