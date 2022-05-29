import React, { useState, useEffect } from 'react'
import styles from './notification.module.css'
import { updateNotificationService } from '../api/notificationService'
import { getDateTimeString, timeDiff } from '../api/utils'

export default function Notification({
  userId,
  appId,
  signature,
  notification: notificationProp,
  color,
  updateUnreadCount,
  onClickNotification
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [notification, setNotification] = useState(notificationProp)

  function updateNotification(status, messageId) {
    if (status === 'ARCHIVE') {
      setIsDeleteDialogOpen(true)
    } else {
      updateNotificationUtil(status, messageId)
    }
  }

  async function updateNotificationUtil(status, messageId) {
    try {
      const res = await updateNotificationService(
        userId,
        appId,
        signature,
        status,
        messageId
      )
      updateUnreadCount(status, messageId, notification.status)
      setNotification({ ...notification, status: status })
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <div
        className={styles.notification}
        onClick={(e) => {
          if (onClickNotification) {
            if (e.target.className !== '_notification-module__action__3b0i1') {
              if (notification.status === 'UNREAD') {
                updateNotificationUtil('READ', notification.message_id)
              }
              onClickNotification({
                click_action: notification.message_body.click_action,
                data: notification.message_body.data
              })
            }
          }
        }}
      >
        <div className={styles.notification__detail}>
          <div>
            {notification.status === 'UNREAD' && (
              <span
                className='fas fa-circle'
                style={{ color: color ? color : 'blue' }}
              ></span>
            )}
          </div>
          <div className={styles.notification__container}>
            <div className={styles.notification__title}>
              <p>{notification.message_body.title}</p>
              <div className={styles.actions__main}>
                <button
                  className={styles.action__btn}
                  style={{ color: 'rgb(104, 101, 101)' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)
                  }}
                >
                  <i className='fas fa-ellipsis-v'></i>
                </button>
                
                  <div className={styles.actions}>
                    {notification.status !== 'READ' && (
                      <div
                        className={styles.action}
                        onClick={(e) =>
                          updateNotification('READ', notification.message_id)
                        }
                      >
                        <i className='fas fa-check-double'></i>
                        Mark as read
                      </div>
                    )}
                    {notification.status !== 'UNREAD' && (
                      <div
                        className={styles.action}
                        onClick={() =>
                          updateNotification('UNREAD', notification.message_id)
                        }
                      >
                        <span className='fas fa-circle'></span>Mark as unread
                      </div>
                    )}
                    {notification.status !== 'ARCHIVE' && (
                      <div
                        className={styles.action}
                        onClick={() =>
                          updateNotification('ARCHIVE', notification.message_id)
                        }
                      >
                        <i className='fas fa-eye-slash'></i>Hide
                      </div>
                    )}
                  </div>
                
              </div>
            </div>
            <div className={styles.des__time}>
              <p className={styles.notification__des}>
                {notification.message_body.body}
              </p>
              <div className={styles.tooltip}>
                {timeDiff(notification.timestamp)}
                <p className={styles.tooltiptext}>
                  {getDateTimeString(notification.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <div className={styles.modal__background}>
          <div className={styles.modal__content}>
            <h3
              style={{
                color: 'black',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}
            >
              Hide notification?
            </h3>
            <div className={styles.dark__divider}></div>
            <p
              style={{
                color: 'rgb(104, 101, 101)',
                fontSize: '1rem',
                marginTop: '1rem'
              }}
            >
              Hiding will remove the notification from the list. You will be
              unable to access it later.
            </p>
            <div className={styles.btn__group}>
              <button
                className={styles.cancel__btn}
                onClick={() => setIsDeleteDialogOpen(close)}
              >
                Cancel
              </button>
              <button
                className={styles.confirm__btn}
                onClick={() =>
                  updateNotificationUtil('ARCHIVE', notification.message_id)
                }
              >
                Hide
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
