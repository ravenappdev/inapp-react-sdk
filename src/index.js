import React from 'react'
import Notifications from './notifications'
import styles from './styles.module.css'
import Helmet from 'react-helmet'

export const InAppNotificationCenter = ({
  color = 'blue',
  indicatorType = 'count',
  fontStyle,
  userId,
  appId,
  signature,
  onClickNotification,
  displayStyle = 'bubble',
  position = 'left'
}) => {
  return (
    <React.Fragment>
      <Helmet>
        <base href='/' />
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v6.1.1/css/all.css'
        />
      </Helmet>
      <div style={{ fontFamily: fontStyle ? fontStyle : 'inherit' }}>
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
    </React.Fragment>
  )
}
