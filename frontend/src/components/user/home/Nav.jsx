import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { getFavoriteProducts, listenForFavoriteChanges } from '../../../utils/favorites'
import { getCartProducts, listenForCartChanges } from '../../../utils/cart'
import { useAuth } from '../../../context/useAuth'

const Nav = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('search') || '')
  const [favoriteCount, setFavoriteCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setSearchText(searchParams.get('search') || '')
  }, [searchParams])

  useEffect(() => {
    const updateFavoriteCount = () => {
      setFavoriteCount(getFavoriteProducts().length)
    }

    updateFavoriteCount()
    return listenForFavoriteChanges(updateFavoriteCount)
  }, [])

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const data = await getCartProducts()
        setCartCount(data.count || 0)
      } catch {
        setCartCount(0)
      }
    }

    updateCartCount()
    return listenForCartChanges(updateCartCount)
  }, [])

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

  const handleLogout = async () => {
    await logout()
    navigate('/auth', { replace: true })
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

          <NavLink to="favorites" aria-label='Favorite products' className='relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-red-50 hover:text-red-500 sm:h-[50px] sm:w-[50px]'>
            <i className="fa-solid fa-heart"></i>
            {favoriteCount > 0 && (
              <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-200 px-1 text-[11px] font-bold leading-none text-white'>
                {favoriteCount}
              </span>
            )}
          </NavLink>

          <NavLink to="cart" aria-label='Cart' className='relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-blue-50 hover:text-blue-600 sm:h-[50px] sm:w-[50px]'>
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && (
              <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-bold leading-none text-white'>
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink to="profile" aria-label='Profile' className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-blue-50 hover:text-blue-600 sm:h-[50px] sm:w-[50px]'>
            {user?.username ? user.username.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
          </NavLink>

          <button type="button" onClick={handleLogout} aria-label='Logout' className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-red-50 hover:text-red-600 sm:h-[50px] sm:w-[50px]'>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Nav
