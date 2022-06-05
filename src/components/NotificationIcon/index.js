import React, { useEffect } from 'react'
import styles from './notification-icon.module.css'

export default function NotificationIcon({
  color,
  indicatorType,
  count,
  isOpen,
  openModal,
  closeModal
}) {
  function toggleModal() {
    if (isOpen) {
      closeModal()
    } else {
      openModal()
    }
  }

  return (
    <button
      className={styles.notification__btn}
      style={{ color: color ? color : 'blue' }}
      onClick={toggleModal}
    >
      <i className={!isOpen ? 'fa-regular fa-bell' : 'fa-solid fa-bell'}></i>
      {!isOpen && count > 0 && indicatorType === 'count' && (
        <span className={styles.count}>{count}</span>
      )}
      {!isOpen && count > 0 && indicatorType === 'dot' && (
        <span className={`fas fa-circle ${styles.dot}`}></span>
      )}
    </button>
  )
}
