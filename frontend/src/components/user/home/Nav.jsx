import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.png'

const Nav = () => {
  return (
    <header className='sticky top-0 z-30 w-full bg-white/95 backdrop-blur'>
      <div className='mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 md:h-[92px] md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8 xl:px-10'>
        <NavLink to="." end className='flex shrink-0 items-center'>
          <img src={logo} alt="Logo" className='h-14 w-auto object-contain transition hover:scale-105 sm:h-16 md:h-20' />
        </NavLink>

        <div className='flex w-full items-center gap-3 md:max-w-3xl'>
          <div className='relative flex-1 bg-white'>
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400"></i>
            <input
              type="text"
              placeholder="Search books, furniture, gadgets..."
              className='h-12 w-full rounded-full border border-gray-300 px-11 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:text-base'
            />
          </div>

          <NavLink to="profile" className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-blue-50 hover:text-blue-600 sm:h-[50px] sm:w-[50px]'>
            <i className="fa-solid fa-user"></i>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Nav
