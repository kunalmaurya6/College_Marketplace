import React from 'react'
import Nav from './home/Nav'
import { Outlet } from 'react-router-dom'

const User = () => {
    return (
        <div
            className='h-screen w-full overflow-y-auto overflow-x-hidden bg-white [&::-webkit-scrollbar]:hidden'
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            <Nav />
            <Outlet />
        </div>
    )
}

export default User
