import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'

const Layout = () => {
  return (
    <div className='text-gray-800 font-inter'>
    <Sidebar />
    <Navbar />
    </div>
  )
}

export default Layout