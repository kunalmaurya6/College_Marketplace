import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/auth', { replace: true })
  }

  return (
    <div className='flex h-full min-h-[60vh] w-full items-center justify-center bg-gray-50 px-4 py-10'>
      <section className='w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex items-center gap-4'>
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-2xl font-extrabold text-blue-700'>
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className='min-w-0'>
            <h1 className='truncate text-2xl font-extrabold text-gray-950'>{user?.username || "User"}</h1>
            <p className='truncate text-sm text-gray-500'>{user?.email}</p>
          </div>
        </div>

        <div className='mt-6 grid gap-3 sm:grid-cols-2'>
          <button
            type='button'
            onClick={() => navigate('/seller')}
            className='inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700'
          >
            <i className='fa-solid fa-store'></i>
            My Uploads
          </button>
          <button
            type='button'
            onClick={() => navigate('/cart')}
            className='inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-bold text-gray-700 transition hover:bg-gray-50'
          >
            <i className='fa-solid fa-cart-shopping'></i>
            My Cart
          </button>
        </div>

        <button
          type='button'
          onClick={handleLogout}
          className='mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-red-100 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50'
        >
          <i className='fa-solid fa-right-from-bracket'></i>
          Logout
        </button>
      </section>
    </div>
  )
}

export default Profile
