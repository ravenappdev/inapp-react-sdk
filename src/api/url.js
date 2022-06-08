export const API_BASE_URL = 'https://api.ravenapp.dev'
export const MARK_ALL_READ =
  API_BASE_URL + '/v1/apps/%s/in_app_notifications/read_all'
export const FETCH_NOTIFICATIONS =
  API_BASE_URL + '/v1/apps/%s/in_app_notifications/fetch'
export const UPDATE_NOTIFICATION =
  API_BASE_URL + '/v1/apps/%s/in_app_notifications/update'
export const FETCH_COUNT =
  API_BASE_URL + '/v1/apps/%s/in_app_notifications/unread_count?user_id=%s'
export const LAST_SEEN =
  API_BASE_URL + '/v1/apps/%s/in_app_notifications/last_open?user_id=%s'
export const DELIVERY_UPDATE = API_BASE_URL + '/v1/apps/%s/in_app/status'
export const USER_SETUP =
  API_BASE_URL + '/v1/apps/%s/in_app_notifications/setup?user_id=%s'
export const ABLY_TOKEN =
  API_BASE_URL +
  '/v1/apps/%s/in_app_notifications/ably_token?user_id=%s&user_signature=%s'
