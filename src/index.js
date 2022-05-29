import React from 'react'
import NotificationProvider from './context'
import BellIcon from './bell-icon'
import Notifications from './notifications'
import styles from './styles.module.css'

export const InAppNotificationCenter = ({
  color = 'blue',
  indicatorType = 'count',
  fontStyle,
  userId,
  appId,
  signature,
  onClickNotification,
  displayStyle = 'drawer',
  position = 'left'
}) => {
  return (
    <html>
      <head>
        <base href='/' />
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v6.1.1/css/all.css'
        />
      </head>
      <body>
        <NotificationProvider userId={userId} appId={appId}>
          <div style={{ fontFamily: fontStyle ? fontStyle : 'inherit' }}>
            {/* <BellIcon
              color={color}
              indicatorType={indicatorType}
              userId={userId}
              appId={appId}
            /> */}
            <Notifications
              color={color}
              indicatorType={indicatorType}
              fontStyle={fontStyle}
              userId={userId}
              appId={appId}
              signature={signature}
              onClickNotification={onClickNotification}
              displayStyle={displayStyle}
              position={position}
            />
          </div>
        </NotificationProvider>
      </body>
    </html>
  )
}
