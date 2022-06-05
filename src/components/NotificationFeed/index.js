import React, { useState, useEffect } from 'react'
import {
  fetchNotificationsService,
  userSetupService,
  ablyTokenService,
  deliveryStatusUpdateService,
  markAllReadService,
  fetchCountService,
  updateLastSeenService
} from '../../api/notificationService'
import Notification from '../NotificationContent'
import NotificationIcon from '../NotificationIcon'
import styles from './notification-feed.module.css'
import Ably from 'ably'
import Swal from 'sweetalert2'
import { setTitle } from '../../api/utils'
import EmptyFeed from '../EmptyFeed'
import Spinner from '../Spinner'

export default function NotificationFeed({
  color,
  indicatorType,
  fontStyle,
  userId,
  appId,
  signature,
  onClickNotification,
  displayStyle,
  position
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showLoadButton, setShowLoadButton] = useState(true)
  const [unread, setUnread] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [count, setCount] = useState(0)

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

  async function fetchCount() {
    try {
      const res = await fetchCountService(userId, appId)
      setCount(res.data.unread_count)
      setTitle(res.data.unread_count)
    } catch (error) {
      console.log(error)
    }
  }

  async function initialize() {
    try {
      fetchCount()
      saveData()
      let client = new Ably.Realtime({
        authUrl: ablyTokenService(appId, userId, signature)
      })

      let channelName = appId + '-' + userId

      let channel = client.channels.get(channelName)
      channel.subscribe((message) => {
        setUnread((prevState) => prevState + 1)
        setCount((prevState) => {
          setTitle(prevState + 1)
          return prevState + 1
        })
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
        setNotifications((prevState) => [temp].concat(prevState))
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
            setCount((prevState) => {
              setTitle(prevState - 1)
              return prevState - 1
            })
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

  async function saveData() {
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
    } catch (error) {
      console.log(error)
    }
  }

  async function markAllRead() {
    try {
      const res = await markAllReadService(
        userId,
        appId,
        signature,
        notifications[0].message_id
      )
      saveData()
    } catch (error) {
      console.log(error)
    }
  }

  async function openModal() {
    setIsOpen(true)
    setCount(0)
    setTitle(0)
    await updateLastSeenService(userId, appId)
  }

  return (
    <React.Fragment>
      <NotificationIcon
        color={color}
        indicatorType={indicatorType}
        count={count}
        isOpen={isOpen}
        openModal={openModal}
        closeModal={() => setIsOpen(false)}
      />
      {isOpen && (
        <div
          style={{
            fontFamily: fontStyle ? fontStyle : 'inherit',
            position: displayStyle === 'drawer' ? 'fixed' : 'relative'
          }}
          className={styles.wrapper}
          onClick={(e) => {
            if (
              e.target.className ===
                '_notification-feed-module__wrapper__2Zeb3' &&
              isOpen
            ) {
              setIsOpen(false)
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
                    <IconButton color={color} onClick={saveData}>
                      <i className='fas fa-redo'></i>
                    </IconButton>
                    <span className={styles.tooltiptext}>Refresh</span>
                  </div>
                  <div className={styles.tooltip}>
                    <IconButton color={color} onClick={markAllRead}>
                      <i className='fas fa-check-double'></i>
                    </IconButton>
                    <span className={styles.tooltiptext}>Mark all as read</span>
                  </div>
                  <IconButton
                    color='rgb(104, 101, 101)'
                    onClick={() => setIsOpen(false)}
                  >
                    <i className='fas fa-times'></i>
                  </IconButton>
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

            <Spinner
              displayStyle={displayStyle}
              color={color}
              show={isLoading}
            ></Spinner>

            <EmptyFeed
              displayStyle={displayStyle}
              color={color}
              show={!isLoading && notifications.length === 0}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
