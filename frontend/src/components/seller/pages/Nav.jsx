import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { useAuth } from '../../../context/useAuth'

const Nav = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        navigate('/auth', { replace: true })
    }

    return (
        <header className='w-full bg-white px-25'>
            <div className='mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8'>
                <NavLink to="." end className='flex shrink-0 items-center'>
                    <img src={logo} alt="Logo" className='h-14 w-auto object-contain transition hover:scale-105 sm:h-16 md:h-20' />
                </NavLink>
                <div className='flex gap-2 sm:gap-4'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-full text-lg text-gray-700 transition hover:bg-gray-100 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                        <i className="fa-regular fa-bell"></i>
                    </div>
                    <NavLink to="profile" className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-700 transition hover:scale-105 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                        {user?.username ? user.username.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
                    </NavLink>
                    <button type='button' onClick={handleLogout} className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-red-50 hover:text-red-600 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Nav
