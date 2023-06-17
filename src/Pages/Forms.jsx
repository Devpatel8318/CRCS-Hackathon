import React, { useState } from 'react';

const formImages = {
  1: require('../images/form/ss1.png'),
  2: require('../images/form/ss2.png'),
  3: require('../images/form/ss3.png'),
  4: require('../images/form/ss4.png'),
  5: require('../images/form/ss5.png'),
};

const formPDFs = {
  1: require('../pdf/Form1.pdf'),
  2: require('../pdf/Form2.pdf'),
  3: require('../pdf/Form3.pdf'),
  4: require('../pdf/Form4.pdf'),
  5: require('../pdf/Form5.pdf'),
};

const DownloadButton = ({ activeForm }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    const pdfNumber = formPDFs[activeForm];
    const pdfName = `Form${activeForm}`;

    link.href = pdfNumber;
    link.download = pdfName;
    link.click();
  };

  return (
    <button className='gap-1 inline-flex justify-center items-center px-3 md:px-6 py-2 md:py-2 text-white rounded-md bg-orange-500' onClick={handleDownload}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-5 h-4 md:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Download PDF
    </button>
  );
};

const NavButton = ({ setActiveForm, activeForm, formNumber }) => {
  const handleClick = () => {
    setActiveForm(formNumber);
  };

  const isActive = activeForm === formNumber;

  return (
    <button onClick={handleClick} className={`gap-1 text-xs sm:text-sm inline-flex justify-center items-center px-1 md:px-6 py-2 md:py-2 rounded-md ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
      <div className='hidden sm:block'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      </div>
      Form {formNumber}
    </button>
  );
};

function Forms() {
  const [activeForm, setActiveForm] = useState(1);

  return (
    <div className='overflow-hidden'>
      <nav className='flex flex-row justify-center w-10/12 mx-auto sm:w-full gap-2 mt-8 mb-4 text-sm sm:text-sm md:text-base'>
        {[1, 2, 3, 4, 5].map((formNumber) => (
          <NavButton
            key={formNumber}
            setActiveForm={setActiveForm}
            activeForm={activeForm}
            formNumber={formNumber}
          />
        ))}
      </nav>
      <div className='mx-auto w-11/12 sm:w-10/12 md:w-9/12 mt-2 sm:mt-4'>
        <div className='image-container border border-gray-300 aspect-[9/10] sm:aspect-auto'>
          <img src={formImages[activeForm]} alt="" className='image' />
        </div>
        <div className='mt-3 mb-6 text-xs sm:text-sm px-1'>
          <DownloadButton activeForm={activeForm} />
        </div>
      </div>
    </div>
  );
}

export default Forms;
