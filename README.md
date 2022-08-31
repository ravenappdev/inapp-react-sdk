# Raven In-App React SDK
Raven In-app SDK lets you add a notification center in your web or mobile app. If you haven't 


## Setup

### Step 1.
Before setting up the SDK, please make sure you have followed the steps to [setup the Raven In-App Integration](https://docs.ravenapp.dev/in-app/integrations/raven) first.

### Step 2.&#x20;

Run the following commands your project root directory :

```
npm i @ravenapp/raven-inapp-react
```

### Step 3.

Inorder to start using InApp React SDK ,import InAppNotificationCenter and styles.

```
import React from 'react'

import { InAppNotificationCenter } from '@ravenapp/raven-inapp-react'
import '@ravenapp/raven-inapp-react/dist/index.css'

const App = () => {
  return (
    <InAppNotificationCenter
      color="<color>"
      indicatorType="<indicator_type>"
      fontStyle="<fontStyle>"
      userId="<user_id>"
      appId="<app_id>"
      signature="<signature>"
      displayStyle="<displayStyle>"
      position="<position>"
      onClickNotification="<callbackFunction_reference>"
    />
  )
}

export default App
```

|Attribute | Purpose | Examples |
|--------- | ------- | -------- |
|userId | Unique identifier of the user opening the notification center | |
|appId| | Raven App ID. Go to Raven dashboard > Settings > AppID | 
|signature| Unique signature generated for the user as described [here](https://app.gitbook.com/o/fOW2cG82hufCVVoTWX7c/s/-MG-HQd2A2Z9XgtUEjJF/~/changes/ZHEZ9iwpjrSgRPltkzMp/in-app/integrations/raven#step-2.-generate-a-unique-signature-for-every-user) | |
|onClickNotification| Method that handles notification click. Args: (clickAction, customData). ClickAction string and CustomData map will be provided in the template and passed to the handler.  Use clickAction to identify what action to perform on click and customData to pass any additional data that might be useful to perfor the click action. | ```(clickAction, customData) => { if (clickAction === "OPEN_ORDER_PAGE") { open("/orders", customData["orderId"])}}``` |
|color | This is your primary color. It will get applied to the buttons and other UI components in the inapp center | 'red', '#FF0000', 'rgb(255,0,0)' (only strings) |
|indicatorType| This attribute accepts only two values i.e 'dot', 'count'. The 'dot' will show a dot on the bell icon whenever a new notification comes and the 'count' will show the count of new notifications. | 'dot', 'count' (only strings) |
|fontStyle| Custom font family for the inapp center. Default will take your system font. | 'Times', 'Courier' etc (only strings) |
|displayStyle|  displayStyle can be either 'drawer' or 'bubble' or 'fullScreen'. Bubble displays the notification list inside a popover. Drawer displays the notification list as full  height on the right or left side of the screen depending on the position value. FullScreen comes with no bell-icon and inherits height and width from parent.|'drawer','bubble' and 'fullScreen' (only strings) |
|position| If the displayStyle is 'drawer' then position accepts two values, i.e 'left' and 'right'. If the display style is 'bubble' then position accepts three values, i.e 'left', 'center' and 'right'.|'left', 'right', 'center' (only strings) |

* Note: userId, appId and signature are the compulsory attributes, remaining are optional.

### In-App React Demo App

You can follow the below process to see the demo of In-App React SDK.

## Clone this repo

```
git clone https://github.com/ravenappdev/inapp-react-sdk.git
```

## Run this command in the root folder.

```
npm install
```

## Move to the example folder.

```
cd example
```
Pass the userId, appId and signature values to the InAppNotificationCenter component in example/src/App.js

## Start the app.

```
npm start
```
