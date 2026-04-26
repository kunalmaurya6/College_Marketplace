import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.png'

const Nav = () => {
    return (
        <header className='w-full bg-white'>
            <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
                <NavLink to="." end className='flex items-center'>
                    <img src={logo} alt="logo" className='h-16 w-auto object-contain transition hover:scale-105'/>
                </NavLink>
                <div className='flex gap-2 sm:gap-4'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-full text-lg text-gray-700 transition hover:bg-gray-100 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                        <i className="fa-regular fa-bell"></i>
                    </div>
                    <NavLink to="profile" className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-700 transition hover:scale-105 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                        <i className="fa-solid fa-user"></i>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Nav
