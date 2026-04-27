import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../../../assets/logo.png'

const Nav = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('search') || '')

  useEffect(() => {
    setSearchText(searchParams.get('search') || '')
  }, [searchParams])

  const scrollToProducts = () => {
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 0)
  }

  const updateSearch = (value) => {
    setSearchText(value)

    const query = value.trim()
    const searchPath = query ? `/?search=${encodeURIComponent(query)}` : '/'

    navigate(searchPath, { replace: true })

    if (query) {
      scrollToProducts()
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    scrollToProducts()
  }

  return (
    <header className='sticky top-0 z-30 w-full bg-white/95 backdrop-blur'>
      <div className='mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 md:h-[92px] md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8 xl:px-10'>
        <NavLink to="." end className='flex shrink-0 items-center'>
          <img src={logo} alt="Logo" className='h-16 w-auto object-contain transition hover:scale-105 sm:h-20 md:h-24' />
        </NavLink>

        <div className='flex w-full items-center gap-3 md:max-w-3xl'>
          <form onSubmit={handleSearch} className='relative flex-1 bg-white'>
            <button type='submit' aria-label='Search products' className='absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition hover:text-blue-600'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              value={searchText}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search books, furniture, gadgets..."
              className='h-12 w-full rounded-full border border-gray-300 px-11 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:text-base'
            />
          </form>

          <NavLink to="profile" className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-blue-50 hover:text-blue-600 sm:h-[50px] sm:w-[50px]'>
            <i className="fa-solid fa-user"></i>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Nav
