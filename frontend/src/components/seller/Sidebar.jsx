import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className='flex w-full gap-2 overflow-x-auto bg-gray-100 p-3 md:h-full md:flex-col md:overflow-visible md:p-4'>
      <NavLink className={({ isActive }) => `flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition md:text-base ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700 hover:bg-white"}`} to="."
        end>
        <i className="fa-solid fa-border-all"></i>Listings
      </NavLink>
      <NavLink className={({ isActive }) => `flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition md:text-base ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700 hover:bg-white"}`} to='product'>
        <i className="fa-regular fa-square-plus"></i>Add Product
      </NavLink>
      <NavLink className={({ isActive }) => `flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition md:text-base ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700 hover:bg-white"}`} to='messages'>
        <i className="fa-regular fa-envelope"></i>Messages
      </NavLink>
      <NavLink className={({ isActive }) => `flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition md:text-base ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700 hover:bg-white"}`} to='profile'>
        <i className="fa-solid fa-user-gear"></i>Profile
      </NavLink>
    </nav>
  )
}

export default Sidebar
