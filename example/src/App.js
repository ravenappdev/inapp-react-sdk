import React from 'react'

import { InAppNotificationCenter } from '@ravenapp/raven-inapp-react'
import '@ravenapp/raven-inapp-react/dist/index.css'

const App = () => {

  function onClickNotification(callbackObj) {
    alert(callbackObj.data)
  }

  return (
    <InAppNotificationCenter
      userId='priyansh'
      appId='ead40fc4-34a2-4e7c-abaf-337c00eef79a'
      signature='a5d61c6d6855a168665b9d69bb0f50318f56c6d5e22879ab8f761d7012ea9d0d'
      onClickNotification={onClickNotification}
    />
  )
}

export default App
