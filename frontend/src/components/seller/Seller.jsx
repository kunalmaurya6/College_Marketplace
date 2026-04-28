import React from 'react'
import Nav from './pages/Nav'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Seller = () => {
    return (
        <div className='flex h-screen w-full flex-col overflow-hidden bg-gray-50'>
            <Nav />
            <div className='flex min-h-0 flex-1 flex-col overflow-hidden border-t border-gray-200 md:flex-row'>
                <aside className='w-full md:w-64 md:shrink-0'>
                    <Sidebar />
                </aside>
                <main className='min-h-0 min-w-0 flex-1 overflow-hidden'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Seller
