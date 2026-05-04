import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { useAuth } from '../../../context/useAuth'
import { fetchData } from '../../../api/server'

const Nav = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [showChatSidebar, setShowChatSidebar] = useState(false)
    const [chatContacts, setChatContacts] = useState([])
    const [loadingChats, setLoadingChats] = useState(false)

    useEffect(() => {
        if (!showChatSidebar || !user) return

        const loadChatContacts = async () => {
            setLoadingChats(true)
            try {
                const data = await fetchData('/chat/contacts')
                setChatContacts(data.users || [])
            } catch (error) {
                console.error('Unable to load chat contacts', error)
            } finally {
                setLoadingChats(false)
            }
        }

        loadChatContacts()
    }, [showChatSidebar, user])

    const handleLogout = async () => {
        await logout()
        navigate('/auth', { replace: true })
    }

    return (
        <>
            <header className='w-full bg-white px-25'>
                <div className='mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => setShowChatSidebar(!showChatSidebar)}
                            aria-label='Toggle chat profiles'
                            className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 md:hidden'
                        >
                            <i className='fa-solid fa-comments'></i>
                        </button>
                        <NavLink to="." end className='flex shrink-0 items-center'>
                            <img src={logo} alt="Logo" className='h-14 w-auto object-contain transition hover:scale-105 sm:h-16 md:h-20' />
                        </NavLink>
                    </div>
                    <div className='flex gap-2 sm:gap-4'>
                        <div className='flex h-11 w-11 items-center justify-center rounded-full text-lg text-gray-700 transition hover:bg-gray-100 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                            <i className="fa-regular fa-bell"></i>
                        </div>
                        <NavLink to="profile" className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-700 transition hover:scale-105 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                            {user?.username ? user.username.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
                        </NavLink>
                        <button type='button' onClick={handleLogout} className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-700 transition hover:scale-105 hover:bg-red-50 hover:text-red-600 sm:h-[50px] sm:w-[50px] sm:text-[20px]'>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </header>

            {showChatSidebar && (
                <div className='border-b border-gray-200 bg-gray-50 md:hidden'>
                    <div className='mx-auto max-w-[1500px] px-4 py-3 sm:px-6 lg:px-8'>
                        <div className='flex items-center justify-between pb-3'>
                            <h3 className='text-sm font-semibold text-gray-900'>Chat Profiles</h3>
                            <button
                                onClick={() => setShowChatSidebar(false)}
                                aria-label='Close chat sidebar'
                                className='flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200'
                            >
                                <i className='fa-solid fa-xmark'></i>
                            </button>
                        </div>
                        <div className='max-h-96 space-y-2 overflow-y-auto'>
                            {loadingChats ? (
                                <div className='p-3 text-sm text-gray-500'>Loading chats...</div>
                            ) : chatContacts.length > 0 ? (
                                chatContacts.map((contact) => (
                                    <button
                                        key={contact._id}
                                        onClick={() => {
                                            navigate('/chat', {
                                                state: {
                                                    chatWith: contact._id,
                                                    chatPartner: contact,
                                                },
                                            })
                                            setShowChatSidebar(false)
                                        }}
                                        className='flex w-full items-center gap-3 rounded-lg bg-white p-3 text-left transition hover:bg-blue-50'
                                    >
                                        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600'>
                                            {contact.username?.charAt(0) || '?'}
                                        </span>
                                        <div className='flex-1 min-w-0'>
                                            <div className='truncate text-sm font-medium text-gray-900'>{contact.username}</div>
                                            <div className='truncate text-xs text-gray-500'>{contact.email}</div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className='p-3 text-sm text-gray-500'>No chats yet</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav
