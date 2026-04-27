import React from 'react'
import HeroImage from '../../../assets/hero_image.jpeg'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  const showProducts = () => {
    document.getElementById('products')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className='w-full bg-sky-50'>
      <div
        className="relative min-h-[560px] w-full bg-cover bg-center sm:min-h-[520px] lg:min-h-[560px]"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-gradient-to-r sm:from-blue-100/95 sm:via-blue-50/80 sm:to-transparent"></div>

        <div className='relative mx-auto flex min-h-[560px] w-full max-w-[1500px] items-center px-4 py-12 sm:min-h-[520px] sm:px-6 lg:min-h-[560px] lg:px-8 xl:px-10'>
          <div className='flex w-full max-w-4xl flex-col items-start gap-5'>
            <div className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm sm:text-base'>
              <i className="fa-solid fa-handshake text-blue-500"></i>
              Trusted by 100+ students
            </div>

            <h1 className='max-w-3xl text-4xl font-bold leading-tight text-gray-950 sm:text-5xl lg:text-7xl xl:text-8xl'>
              <span className="block whitespace-nowrap">Buy & Sell</span>
              <span className="block">on Campus</span>
            </h1>

            <p className='max-w-2xl text-base leading-7 text-gray-600 sm:text-lg lg:text-xl lg:leading-8'>
              The safest marketplace to buy and sell used books, gadgets, and more with
              fellow students.
            </p>

            <div className='mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-5'>
              <button type='button' onClick={showProducts} className='inline-flex justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 sm:px-7'>
                Browse Items
              </button>
              <NavLink to='/seller/product' className='inline-flex justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:px-7'>
                Start Selling
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
