import React from 'react'
import { AddProduct, Listings, Messages, Profile } from './pages/pages'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full h-full bg-gray-100 flex flex-col gap-2 p-4'>
      <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`} to="."
        end>
        <i className="fa-solid fa-border-all"></i>Listings
      </NavLink>
      <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`} to='product'>
        <i className="fa-regular fa-square-plus"></i>Add Product
      </NavLink>
      <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`} to='messages'>
        <i className="fa-regular fa-envelope"></i>Messages
      </NavLink>
      <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`} to='profile'>
        <i className="fa-solid fa-user-gear"></i>Profile
      </NavLink>
    </div>
  )
}

export default Sidebar