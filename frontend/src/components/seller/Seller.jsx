import React from 'react'
import Nav from './pages/Nav'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Seller = () => {
    return (
        <div className='flex min-h-screen w-full flex-col bg-gray-50'>
            <Nav />
            <div className='flex flex-1 flex-col border-t border-gray-200 md:flex-row'>
                <aside className='w-full md:w-64 md:shrink-0'>
                    <Sidebar />
                </aside>
                <main className='min-w-0 flex-1'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Seller
