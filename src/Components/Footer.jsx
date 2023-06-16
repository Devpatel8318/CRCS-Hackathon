import React from "react";


const Footer = () => {
  // In Future Links can be added
  // const links = [
  //   { title: "State Registrars ", url: "#" },
  //   { title: "Societies in the Second Schedule ", url: "#" },
  //   { title: "Complaint & Hearing Notice ", url: "#" },
  //   { title: "Hearing Order Sheet ", url: "#" },
  // ];

  return (
    <footer className="bg-gray-900 py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Future code for adding links */}
        {/* <ul className="flex flex-wrap justify-center ">
          {links.map((link, index) => (
            <li key={index} className="mr-4 ">
              <a href={link.url} className="text-[10px] md:text-sm text-gray-300 hover:text-white">
                {link.title}
              </a>
            </li>
          ))}
        </ul> */}
         <div className="mt-4 text-xs md:text-sm text-gray-300 text-center">
          &copy; 2023 The Central Registrar for Cooperative Societies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
