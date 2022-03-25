export const formatDate = (dateString) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" }
  const timeOptions = { timeStyle: 'short', hour12: true, timeZone: 'PST' }
  return new Date(dateString).toLocaleDateString(undefined, dateOptions)
  + ' ' + new Date(dateString).toLocaleTimeString('en', timeOptions) + ' ' + timeOptions.timeZone
}