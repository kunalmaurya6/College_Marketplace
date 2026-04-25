import React from 'react'
import Products from './Products'

const Listing = () => {
  return (
    <section className='mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8 xl:px-10'>
      <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>Trusted Products</h2>
      <Products/>
    </section>
  )
}

export default Listing
