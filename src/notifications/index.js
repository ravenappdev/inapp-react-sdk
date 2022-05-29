import React, { useState, useEffect } from 'react'
import {
  fetchNotificationsService,
  userSetupService,
  updateLastSeenService,
  ablyTokenService,
  deliveryStatusUpdateService
} from '../api/notificationService'
import { useNotficationContext } from '../context'
import Notification from './notification'
import styles from './notifications.module.css'
import Ably from 'ably'
import Swal from 'sweetalert2'

export default function Notifications({
  color,
  fontStyle,
  userId,
  appId,
  signature,
  onClickNotification,
  displayStyle,
  position
}) {
  const { count, isOpen, closeModal, updateCount } = useNotficationContext()
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showLoadButton, setShowLoadButton] = useState(true)
  const [unread, setUnread] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  async function checkUserExists() {
    try {
      if (!localStorage.getItem('userExists')) {
        const res = await userSetupService(userId, appId, signature)
        localStorage.setItem('userExists', true)
        initialize()
      } else {
        initialize()
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function initialize() {
    try {
      setIsLoading(true)
      const res = await fetchNotificationsService(
        userId,
        appId,
        signature,
        null
      )
      setNotifications(res.data.notifications)
      setShowLoadButton(!(res.data.notifications.length < 20))
      setUnread(0)
      let tempUnread = 0
      res.data.notifications.map((notification) => {
        if (notification.status === 'UNREAD') {
          tempUnread += 1
        }
      })
      setUnread(tempUnread)
      setIsLoading(false)

      if (displayStyle === 'fullScreen') {
        updateLastSeenService(userId, appId)
      }

      let client = new Ably.Realtime({
        authUrl: ablyTokenService(appId, userId, signature)
      })

      let channelName = appId + '-' + userId

      let channel = client.channels.get(channelName)
      channel.subscribe((message) => {
        updateCount(count + 1)
        setUnread(unread + 1)
        setTimeout(() => {
          deliveryStatusUpdateService(
            appId,
            message.data.raven_notification_id,
            new Date().getTime()
          )
        }, 1000)

        let temp = {
          message_id: message.data.raven_notification_id,
          message_body: {
            title: message.data.title,
            body: message.data.body,
            click_action: message.data.click_action,
            data: message.data.data
          },
          timestamp: message.data.timestamp,
          status: 'UNREAD'
        }
        setNotifications([temp].concat(notifications))
        Swal.fire({
          title: message.data.title,
          text: message.data.body,
          icon: 'success',
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 8000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        }).then((result) => {
          if (result.isDismissed && result.dismiss?.toString() === 'close') {
            updateCount(count - 1)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkUserExists()
  }, [])

  function updateUnreadCount(status, messageId, currentStatus) {
    if (status === 'READ' || currentStatus === 'UNREAD') {
      setUnread(unread - 1)
    }
    if (status === 'UNREAD') {
      setUnread(unread + 1)
    }
    if (status === 'ARCHIVE') {
      setNotifications(
        notifications.filter(
          (notification) => notification.message_id !== messageId
        )
      )
    }
  }

  async function loadMore() {
    try {
      setIsLoadingMore(true)
      const res = await fetchNotificationsService(
        userId,
        appId,
        signature,
        notifications[notifications.length - 1].message_id
      )
      setIsLoadingMore(false)
      setNotifications(notifications.concat(res.data.notifications))
      setShowLoadButton(!(res.data.notifications.length < 20))
      let tempUnread = unread
      res.data.notifications.map((notification) => {
        if (notification.status === 'UNREAD') {
          tempUnread += 1
        }
      })
      setUnread(tempUnread)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <React.Fragment>
      {isOpen && displayStyle !== 'fullScreen' && (
        <div
          style={{
            fontFamily: fontStyle ? fontStyle : 'inherit',
            position: displayStyle === 'drawer' ? 'fixed' : 'relative'
          }}
          className={styles.wrapper}
          onClick={(e) => {
            if (
              e.target.className === '_notifications-module__wrapper__f--lY' &&
              isOpen
            ) {
              closeModal()
            }
          }}
        >
          <div
            className={`${styles.notifications}
       ${displayStyle === 'bubble' ? styles.bubble : null} 
      ${displayStyle === 'bubble' && position === 'left' ? styles.left : null}
      ${
        displayStyle === 'bubble' && position === 'center'
          ? styles.center
          : null
      }
      ${displayStyle === 'bubble' && position === 'right' ? styles.right : null}
      ${
        displayStyle === 'drawer' && position === 'left'
          ? styles.drawerLeft
          : null
      }
     ${
       displayStyle === 'drawer' && position === 'right'
         ? styles.drawerRight
         : null
     }
    `}
          >
            <div className={styles.notifications__title}>
              <div className={styles.notifications__header}>
                <h3
                  className={styles.refresh}
                  style={{ marginBottom: '0.4rem' }}
                >
                  Notifications
                </h3>
                <div className={styles.btn__group}>
                  <div className={styles.tooltip}>
                    <button
                      className={styles.btn}
                      style={{ color: color ? color : 'blue' }}
                    >
                      <i className='fas fa-redo'></i>
                    </button>
                    <span className={styles.tooltiptext}>Refresh</span>
                  </div>
                  <div className={styles.tooltip}>
                    <button
                      className={styles.btn}
                      style={{ color: color ? color : 'blue' }}
                    >
                      <i className='fas fa-check-double'></i>
                    </button>
                    <span className={styles.tooltiptext}>Mark all as read</span>
                  </div>
                  <button
                    className={styles.btn}
                    style={{ color: 'rgb(104, 101, 101)', marginLeft: '1rem' }}
                    onClick={closeModal}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
              <p className={styles.date}>
                {unread > 0 ? unread + ' ' : 'No '}
                unread notifications
              </p>
            </div>
            <div className={styles.dark__divider}></div>
            {!isLoading && notifications.length > 0 && (
              <div
                className={`${styles.all__notifications}
         ${displayStyle === 'bubble' ? styles.bubbleHeight : null}
        ${displayStyle === 'drawer' ? styles.fullHeight : null}`}
              >
                {notifications.map((notification) => {
                  return (
                    <React.Fragment key={notification.message_id}>
                      <Notification
                        userId={userId}
                        appId={appId}
                        signature={signature}
                        notification={notification}
                        color={color}
                        updateUnreadCount={updateUnreadCount}
                        onClickNotification={onClickNotification}
                      />
                      <div className={styles.divider}></div>
                    </React.Fragment>
                  )
                })}
                {showLoadButton && (
                  <button
                    style={{ color: color ? color : 'blue' }}
                    className={styles.load__more}
                    onClick={loadMore}
                  >
                    {isLoadingMore ? 'LOADING...' : 'LOAD MORE'}
                  </button>
                )}
              </div>
            )}
            {isLoading && (
              <div
                className={`${styles.loading__main}
         ${displayStyle === 'bubble' ? styles.bubbleHeight : null}
        ${displayStyle === 'drawer' ? styles.fullHeight : null}`}
              >
                <div
                  className={styles.loading}
                  style={{ borderTopColor: color ? color : 'blue' }}
                ></div>
              </div>
            )}
            {!isLoading && notifications.length === 0 && (
              <div
                className={`${styles.loading__main}
         ${displayStyle === 'bubble' ? styles.bubbleHeight : null}
        ${displayStyle === 'drawer' ? styles.fullHeight : null}`}
              >
                <div className={styles.no__notifications}>
                  <i
                    className='fas fa-comment-slash'
                    style={{ color: color ? color : 'blue' }}
                  ></i>
                  <p>No notifications present</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}