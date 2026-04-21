import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const seller = () => {
    return (
        <div className='w-[100vw] h-[100vh]'>
            <Nav />
            <hr />
            <div className='w-full h-full flex'>
                <Sidebar />
                {/* child component */}
                <Outlet />
            </div>
        </div>
    )
}

export default seller
