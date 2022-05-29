import {
  MARK_ALL_READ,
  FETCH_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  FETCH_COUNT,
  LAST_SEEN,
  DELIVERY_UPDATE,
  USER_SETUP,
  ABLY_TOKEN
} from './url'
import axios from 'axios'

export const fetchNotificationsService = (userId, appId, signature, lastMessageId) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        FETCH_NOTIFICATIONS.format(appId),
        {
          user_id: userId,
          last_message_id: lastMessageId
        },
        {
          headers: {
            'X-Raven-User-Signature': signature
          }
        }
      )
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const userSetupService = (userId, appId, signature) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        USER_SETUP.format(appId, userId, signature),
        {},
        {
          headers: {
            'X-Raven-User-Signature': signature
          }
        }
      )
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const markAllReadService = (userId, appId, signature, messageId) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        MARK_ALL_READ.format(appId),
        {
          user_id: userId,
          message_id: messageId
        },
        {
          headers: {
            'X-Raven-User-Signature': signature
          }
        }
      )
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const updateNotificationService = (
  userId,
  appId,
  signature,
  status,
  messageId
) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        UPDATE_NOTIFICATION.format(appId),
        {
          user_id: userId,
          message_id: messageId,
          status: status
        },
        {
          headers: {
            'X-Raven-User-Signature': signature
          }
        }
      )
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const fetchCountService = (userId, appId) =>
  new Promise((resolve, reject) => {
    axios
      .get(FETCH_COUNT.format(appId, userId))
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const updateLastSeenService = (userId, appId) =>
  new Promise((resolve, reject) => {
    axios
      .put(LAST_SEEN.format(appId, userId), {})
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const deliveryStatusUpdateService = (appId, messageId, date) =>
  new Promise((resolve, reject) => {
    axios
      .post(DELIVERY_UPDATE.format(appId), {
        timestamp: date - 1000,
        status: 'DELIVERED',
        notification_id: messageId,
        current_timestamp: date - 1000
      })
      .then((response) => {
        if (response) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const ablyTokenService = (appId, userId, signature) => {
  return ABLY_TOKEN.format(appId, userId, signature)
}


String.prototype.format = function () {
  return [...arguments].reduce((p, c) => p.replace(/%s/, c), this)
}