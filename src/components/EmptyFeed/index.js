import React from 'react'
import styles from './empty-feed.module.css'

function EmptyFeed({ displayStyle, color, show }) {
  if (show) {
    return (
      <div
        className={`${styles.container}
             ${displayStyle === 'bubble' ? styles.bubble__height : null}
            ${displayStyle === 'drawer' ? styles.full__height : null}`}
      >
        <div>
          <i
            className='fas fa-comment-slash'
            style={{ color: color ? color : 'blue' }}
          ></i>
          <p>No notifications present</p>
        </div>
      </div>
    )
  }
  return null
}

export default EmptyFeed
