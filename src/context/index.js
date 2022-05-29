import React, { useContext, useReducer } from 'react'
import { setTitle } from '../api/utils'
import {
  fetchCountService,
  updateLastSeenService
} from '../api/notificationService'
const NotificationContext = React.createContext()

export default function NotificationProvider({
  children,
  userId,
  appId
}) {
  const [state, dispatch] = useReducer(NotificationReducer, {
    count: 0,
    isOpen: false,
    selectedNotification: null
  })

  async function fetchCount() {
    try {
      const res = await fetchCountService(userId, appId)
      updateCount(res.data.unread_count)
    } catch (error) {
      console.log(error)
    }
  }

  function updateCount(count) {
    setTitle(count)
    dispatch({ type: 'CHANGE_COUNT', payload: count })
  }

  function closeModal() {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  function openModal() {
    dispatch({ type: 'CHANGE_COUNT', payload: 0 })
    dispatch({ type: 'OPEN_MODAL' })
    updateLastSeenService(userId, appId)
  }

  function setSelectedNotification(notification) {
    dispatch({ type: 'SET_SELECTED_NOTIFICATION', payload: notification })
  }

  return (
    <NotificationContext.Provider
      value={{ ...state, closeModal, openModal, setSelectedNotification, updateCount, fetchCount }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotficationContext() {
  return useContext(NotificationContext)
}

function NotificationReducer(state, action) {
  const { type, payload } = action
  if (type === 'CHANGE_COUNT') {
    return { ...state, count: payload }
  }
  if (type === 'CLOSE_MODAL') {
    return { ...state, isOpen: false }
  }
  if (type === 'OPEN_MODAL') {
    return { ...state, isOpen: true }
  }
  if (type === 'SET_SELECTED_NOTIFICATION') {
    return { ...state, selectedNotification: payload }
  }
  return state
}

// "start": "microbundle-crl watch --no-compress --format modern,cjs",
