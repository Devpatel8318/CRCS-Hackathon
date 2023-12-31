import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './Pages/Index'
import Layout from './Components/Layout'
import Reports from './Pages/Reports'
import { ThemeProvider } from 'styled-components'
import StateCharts from './Pages/StateCharts'
import PerState from './Pages/PerState'
import Map from './Pages/Map'
import Forms from './Pages/Forms'
import Login from './Pages/login/Login'

function App() {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/dropdown' element={<Index />} />
              <Route path='/perstate' element={<PerState />} />
              <Route path='/chart' element={<StateCharts />} />
              <Route path='/map' element={<Map />} />
              <Route path='/forms' element={<Forms />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
  )
}

export default App