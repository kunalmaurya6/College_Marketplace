import React, { useState } from 'react'
import Product from './Product'

const Listings = () => {
  const [order, setOrder] = useState("all")
  const handleChange = (e) => {
    // console.log(e.target.value)
    setOrder(e.target.value)
  }
  
  return (
    <div className='flex h-full w-full flex-col gap-5 p-4 sm:p-6 lg:p-10'>
      <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-2xl font-bold'>My Listings</h1>
        <div>
          <select className='w-full rounded-lg border-2 border-blue-500 px-3 py-2 text-blue-500 outline-none sm:w-auto' onChange={handleChange} value={order}>
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
      <div className='min-h-0 w-full flex-1'>
        <Product order={order} />
      </div>
    </div>
  )
}

export default Listings
