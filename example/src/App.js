import React from 'react'

import { InAppNotificationCenter } from '@ravenapp/raven-inapp-react'
import '@ravenapp/raven-inapp-react/dist/index.css'

const App = () => {

  function onClickNotification(callbackObj) {
    alert(callbackObj.data)
  }

  return (
    <InAppNotificationCenter
      userId=''
      appId=''
      signature=''
      onClickNotification={onClickNotification}
    />
  )
}

export default App
