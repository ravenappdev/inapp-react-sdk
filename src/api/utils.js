import moment from 'moment'

export function getDateTimeString(dateValue) {
  var date = new Date(parseInt(dateValue, 10))
  return moment(date).format('DD-MM-YYYY hh:mm:ss a')
}

export function timeDiff(dateValue) {
  var date = moment(new Date(parseInt(dateValue, 10)))
  var currentDate = moment(new Date())
  var timeDiffSeconds = currentDate.diff(date, 'seconds')
  var timeDiffMinutes = currentDate.diff(date, 'minutes')
  var timeDiffHours = currentDate.diff(date, 'hours')
  var timeDiffDays = currentDate.diff(date, 'days')
  var timeDiffWeeks = currentDate.diff(date, 'weeks')
  var timeDiffMonths = currentDate.diff(date, 'months')
  var timeDiffYears = currentDate.diff(date, 'years')
  if (timeDiffYears > 0) {
    return timeDiffYears + 'y'
  }
  if (timeDiffMonths > 0) {
    return timeDiffMonths + 'mo'
  }
  if (timeDiffWeeks > 0) {
    return timeDiffWeeks + 'w'
  }
  if (timeDiffDays > 0) {
    return timeDiffDays + 'd'
  }
  if (timeDiffHours > 0) {
    return timeDiffHours + 'h'
  }
  if (timeDiffMinutes > 0) {
    return timeDiffMinutes + 'm'
  }
  if (timeDiffSeconds > 0) {
    return timeDiffSeconds + 's'
  }
  return
}

export function setTitle(count) {
  let tmp = document.title.indexOf(') ')
  if (count > 0) {
    document.title = `(${count}) ${document.title.substring(tmp + 1)}`
  }
  if (tmp !== -1 && count === 0) {
    document.title = document.title.substring(tmp + 1)
  }
}
