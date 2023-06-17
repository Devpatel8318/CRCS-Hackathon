import React, { useState } from 'react';
import { f1, f2, f3, f4, f5 } from '../images/form/imageProvider.js';
const pdf1 = require('../pdf/Form1.pdf');
const pdf2 = require('../pdf/Form1.pdf');
const pdf3 = require('../pdf/Form1.pdf');
const pdf4 = require('../pdf/Form1.pdf');
const pdf5 = require('../pdf/Form1.pdf');
const DownloadButton = ({ active }) => {
  const handleDownload = () => {

    const link = document.createElement('a');
    let pdfNumber = pdf1;
    let pdfName = "Form1";


    if (active === f1) {
      pdfNumber = pdf1;
      pdfName = "Form1";

    }
    else if (active === f2) {
      pdfNumber = pdf2;
      pdfName = "Form2";

    }
    else if (active === f3) {
      pdfNumber = pdf3;
      pdfName = "Form3";

    }
    else if (active === f4) {
      pdfNumber = pdf4;
      pdfName = "Form4";

    }
    else if (active === f5) {
      pdfNumber = pdf5;
      pdfName = "Form5";

    }

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

const activeCss = "gap-1 text-xs sm:text-sm inline-flex justify-center items-center px-1 sm:px-3 md:px-6 py-2 md:py-2 text-white rounded-md bg-orange-500";
const inActiveCss = "gap-1 text-xs sm:text-sm inline-flex justify-center items-center px-1 md:px-6 py-2 md:py-2 rounded-md bg-gray-200 text-gray-600";

const NavButton = ({ setActive, active, x, number }) => {
  return (
    <button onClick={() => setActive(x)} className={active === x ? activeCss : inActiveCss}>
      <div className='hidden sm:block'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 md:w-6 h-4 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      </div>
      Form {number}
    </button>
  );
};

function Forms() {
  const [active, setActive] = useState(f1);

  return (
    <>
      <div className='overflow-hidden'>
        <nav className='flex flex-row justify-center w-10/12 mx-auto sm:w-full gap-2 mt-8 mb-4 text-sm sm:text-sm md:text-base'>
          <NavButton setActive={setActive} active={active} x={f1} number={1} />
          <NavButton setActive={setActive} active={active} x={f2} number={2} />
          <NavButton setActive={setActive} active={active} x={f3} number={3} />
          <NavButton setActive={setActive} active={active} x={f4} number={4} />
          <NavButton setActive={setActive} active={active} x={f5} number={5} />
        </nav>
        <div className='mx-auto w-11/12 sm:w-10/12 md:w-9/12 mt-2 sm:mt-4'>
          <div className='image-container border border-gray-300 aspect-[9/10] sm:aspect-auto'>
            <img src={active} alt="" className='image' />
          </div>
          <div className='mt-3 mb-6 text-xs sm:text-sm px-1'>
            <DownloadButton active={active} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
