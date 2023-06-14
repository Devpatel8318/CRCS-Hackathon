import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './Pages/Index'
import Layout from './Components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/all' element={<Index />} />
          <Route path='/services' element={<Index />} />
          <Route path='/dropdown' element={<Index />} />
          <Route path='/pricing' element={<Index />} />
          <Route path='/contact' element={<Index />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App