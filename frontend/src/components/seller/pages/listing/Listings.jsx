import React, { useState } from 'react'
import Product from './Product'

const Listings = () => {
  const [order, setOrder] = useState("all")
  const handleChange = (e) => {
    // console.log(e.target.value)
    setOrder(e.target.value)
  }
  
  return (
    <div className='flex h-full min-h-0 w-full flex-col gap-6 overflow-hidden p-4 sm:p-6 lg:p-8'>
      <div className='flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Seller workspace</p>
          <h1 className='mt-1 text-2xl font-bold text-gray-950 sm:text-3xl'>My Listings</h1>
          <p className='mt-2 text-sm text-gray-500'>Manage product status, sale availability, and listing edits.</p>
        </div>
        <div className='flex items-center gap-3'>
          <label htmlFor='listing-status' className='text-sm font-semibold text-gray-600'>Filter</label>
          <select id='listing-status' className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:w-auto' onChange={handleChange} value={order}>
            <option value="all">View All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      {/* select by */}
      {/* <div className='w-full h-1/20 bg-red-100 flex justify-start items-center gap-10'>
        <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`}>All Listing</NavLink>
        <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`}>Approved</NavLink>
        <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`}>Pending</NavLink>
        <NavLink className={({ isActive }) => `p-2 rounded-lg ${isActive ? "bg-blue-200" : ""}`}>Rejected</NavLink>
      </div> */}
      <div className='min-h-0 w-full flex-1 overflow-hidden'>
        <Product order={order} />
      </div>
    </div>
  )
}

export default Listings
