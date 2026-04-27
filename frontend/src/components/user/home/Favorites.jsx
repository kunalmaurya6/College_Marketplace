import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getFavoriteProducts, listenForFavoriteChanges } from '../../../utils/favorites'
import Card from './listing/Card'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadFavorites = () => {
      setFavorites(getFavoriteProducts())
    }

    loadFavorites()
    return listenForFavoriteChanges(loadFavorites)
  }, [])

  return (
    <main className='mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>Favorite Products</h1>
          <p className='mt-1 text-sm text-gray-500'>Products you marked with the heart icon.</p>
        </div>

        <NavLink to='/' className='inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'>
          <i className='fa-solid fa-arrow-left text-xs'></i>
          Browse
        </NavLink>
      </div>

      {favorites.length === 0 ? (
        <div className='flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-4 text-center'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500'>
            <i className='fa-regular fa-heart'></i>
          </div>
          <h2 className='mt-4 text-xl font-bold text-gray-900'>No favorites yet</h2>
          <p className='mt-2 max-w-md text-sm text-gray-500'>Tap the heart on any product to save it here.</p>
        </div>
      ) : (
        <div className='grid w-full grid-cols-1 gap-5 rounded-t-lg sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
          {favorites.map((product) => (
            <Card key={product._id || product.id || product.title} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Favorites
