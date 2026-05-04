import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import { fetchData, API_BASE_URL } from '../../api/server'
import { useAuth } from '../../context/useAuth'

const SOCKET_SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, '') || 'http://localhost:5000'

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const Chat = () => {
  const { user } = useAuth()
  const location = useLocation()
  const initialPartner = location.state?.chatPartner || null
  const initialId = location.state?.chatWith || new URLSearchParams(location.search).get('chatWith') || null

  const [contacts, setContacts] = useState(initialPartner ? [initialPartner] : [])
  const [allUsers, setAllUsers] = useState([])
  const [activeId, setActiveId] = useState(initialId)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [activeUsers, setActiveUsers] = useState([])
  const [loadingContacts, setLoadingContacts] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [showAllProfiles, setShowAllProfiles] = useState(false)
  const [showChatWindow, setShowChatWindow] = useState(!!initialId)
  const socketRef = useRef(null)

  const activeContact = useMemo(
    () => contacts.find((contact) => contact._id === activeId),
    [contacts, activeId]
  )

  useEffect(() => {
    if (!user) return

    const loadContacts = async () => {
      setLoadingContacts(true)
      try {
        const data = await fetchData('/chat/contacts')
        const newContacts = Array.isArray(data.users) ? data.users : []
        setContacts((prev) => {
          const merged = [...prev]
          newContacts.forEach((contact) => {
            if (!merged.some((item) => item._id === contact._id)) {
              merged.push(contact)
            }
          })
          return merged
        })

        if (!activeId && newContacts.length) {
          setActiveId(newContacts[0]._id)
        }
      } catch (error) {
        console.error('Unable to load contacts', error)
      } finally {
        setLoadingContacts(false)
      }
    }

    loadContacts()
  }, [user, activeId])

  useEffect(() => {
    if (!user || !showAllProfiles) return

    const loadAllUsers = async () => {
      setLoadingUsers(true)
      try {
        const data = await fetchData('/chat/users')
        setAllUsers(data.users || [])
      } catch (error) {
        console.error('Unable to load users', error)
      } finally {
        setLoadingUsers(false)
      }
    }

    loadAllUsers()
  }, [user, showAllProfiles])

  useEffect(() => {
    if (!user || !activeId) return

    const activeContactExists = contacts.some((contact) => contact._id === activeId)
    if (!activeContactExists) {
      const loadPartner = async () => {
        try {
          const data = await fetchData(`/chat/user/${activeId}`)
          if (data.user) {
            setContacts((prev) => (prev.some((item) => item._id === data.user._id) ? prev : [...prev, data.user]))
          }
        } catch (error) {
          console.error('Unable to load chat contact', error)
        }
      }

      loadPartner()
    }
  }, [activeId, contacts, user])

  useEffect(() => {
    if (!user) return

    const socket = io(SOCKET_SERVER_URL, {
      auth: { userId: user.id },
      transports: ['websocket'],
      withCredentials: true,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to chat server', socket.id)
    })

    socket.on('active_users', (users) => {
      setActiveUsers(Array.isArray(users) ? users : [])
    })

    socket.on('private_message', (message) => {
      if (!message) return

      setMessages((prev) => {
        const exists = prev.some((item) => item._id === message._id)
        if (exists) return prev

        if (message.by === activeId || message.to === activeId) {
          return [...prev, message]
        }

        return prev
      })
    })

    socket.on('connect_error', (error) => {
      console.error('Chat socket connect error', error)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [user, activeId])

  useEffect(() => {
    const loadConversation = async () => {
      if (!activeId) {
        setMessages([])
        return
      }

      try {
        const data = await fetchData(`/chat/conversation/${activeId}`)
        setMessages(data.messages || [])
      } catch (error) {
        console.error('Unable to load conversation', error)
        setMessages([])
      }
    }

    loadConversation()
  }, [activeId])

  const handleSend = () => {
    if (!draft.trim() || !activeId || !socketRef.current) return

    socketRef.current.emit('private_message', {
      to: activeId,
      message: draft.trim(),
    })

    setDraft('')
  }

  const displayedUsers = showAllProfiles ? allUsers : contacts
  const isLoading = showAllProfiles ? loadingUsers : loadingContacts

  return (
    <div className='mx-auto flex min-h-[80vh] w-full max-w-[1200px] gap-4 p-4 lg:flex-row'>
      {/* Contact List - Hidden on mobile if chat window is open */}
      <div className={`w-full rounded-2xl border border-slate-200 bg-white shadow-sm lg:w-[320px] ${showChatWindow ? 'hidden lg:block' : 'block'}`}>
        <div className='flex items-center justify-between border-b border-slate-200 px-4 py-4'>
          <div className='text-lg font-semibold'>
            {showAllProfiles ? 'Initiated Chats' : 'Chats'}
          </div>
          <button
            onClick={() => setShowAllProfiles(!showAllProfiles)}
            className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200'
            aria-label={showAllProfiles ? 'Show chats' : 'Show initiated chats'}
          >
            <i className={`fa-solid ${showAllProfiles ? 'fa-comments' : 'fa-share'}`}></i>
          </button>
        </div>
        <div className='max-h-[60vh] overflow-y-auto sm:max-h-[72vh]'>
          {isLoading ? (
            <div className='p-4 text-sm text-slate-500'>Loading...</div>
          ) : displayedUsers.length ? (
            displayedUsers.map((contact) => (
              <button
                key={contact._id}
                onClick={() => {
                  setActiveId(contact._id)
                  setShowChatWindow(true)
                }}
                className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition ${contact._id === activeId ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
              >
                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold uppercase text-slate-700'>
                  {contact.username?.charAt(0) || '?'}
                </span>
                <div className='flex-1 min-w-0'>
                  <div className='truncate font-medium'>{contact.username}</div>
                  <div className='truncate text-xs text-slate-500'>{contact.email}</div>
                </div>
                {!showAllProfiles && (
                  <span className={`h-3 w-3 rounded-full ${activeUsers.includes(contact._id) ? 'bg-green-500' : 'bg-slate-300'}`} />
                )}
              </button>
            ))
          ) : (
            <div className='p-4 text-sm text-slate-500'>
              {showAllProfiles ? 'No initiated chats yet.' : 'No prior chats yet. Start a conversation from a product page.'}
            </div>
          )}
        </div>
      </div>

      {/* Chat Window - Hidden on mobile if contact list is shown */}
      <div className={`flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${showChatWindow ? 'block' : 'hidden lg:block'}`}>
        <div className='border-b border-slate-200 px-6 py-4'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setShowChatWindow(false)}
              className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 lg:hidden'
              aria-label='Back to contacts'
            >
              <i className='fa-solid fa-arrow-left'></i>
            </button>
            <div className='flex-1'>
              <div className='text-lg font-semibold'>
                {activeContact ? activeContact.username : 'Select a contact'}
              </div>
              <div className='text-sm text-slate-500'>
                {activeContact ? (activeUsers.includes(activeId) ? 'Online' : 'Offline') : 'Tap a contact to start chatting'}
              </div>
            </div>
          </div>
        </div>

        <div className='flex h-[calc(100vh-16rem)] flex-col sm:h-[calc(100vh-18rem)] lg:h-[calc(100vh-16rem)]'>
          <div className='flex-1 overflow-y-auto px-6 py-4'>
            {messages.length ? (
              messages.map((message) => {
                const isMine = message.by === user.id
                return (
                  <div key={message._id} className={`mb-3 flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${isMine ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-900'}`}>
                      <div>{message.message}</div>
                      <div className='mt-2 text-right text-[10px] text-slate-500'>{formatTime(message.createdAt)}</div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='mt-16 text-center text-sm text-slate-500'>No messages yet. Send the first message.</div>
            )}
          </div>

          <div className='border-t border-slate-200 bg-slate-50 px-6 py-4'>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className='min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400'
                placeholder={activeContact ? `Message ${activeContact.username}` : 'Select a contact to chat'}
                disabled={!activeContact}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleSend()
                  }
                }}
              />
              <button
                onClick={handleSend}
                disabled={!activeContact || !draft.trim()}
                className='inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto'
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
