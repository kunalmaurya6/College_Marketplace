import React from 'react'
import Nav from './pages/Nav'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Seller = () => {
    return (
        <div className='w-[100vw] h-[100vh]'>
            <div className='w-full h-1/10'>
                <Nav />
            </div>
            <div className='w-full h-9/10 flex border-t-2 border-gray-200'>
                <div className='w-8/50 h-full'>
                    <Sidebar />
                </div>
                {/* child component */}
                <div className='w-full h-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Seller
