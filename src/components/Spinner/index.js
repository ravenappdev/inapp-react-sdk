import React from 'react'
import styles from './spinner.module.css'

function Spinner({ displayStyle, color, show }) {
  if (show) {
    return (
      <div
        className={`${styles.container}
         ${displayStyle === 'bubble' ? styles.bubble__height : null}
        ${displayStyle === 'drawer' ? styles.full__height : null}`}
      >
        <div
          className={styles.loading}
          style={{ borderTopColor: color ? color : 'blue' }}
        ></div>
      </div>
    )
  }
  return null
}

export default Spinner
