import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout       