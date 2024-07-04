import moment from 'moment'

const dateLong = (val) => {
  if (val) return moment(val).format('DD MMM YYYY, h:mm:ss A')
  return ''
}

const dateShort = (val) => {
  if (val) return moment(val).format('DD MMM YYYY')
  return ''
}

function capitalizeFirstLetter(string) {
  return string.replace(/[-_]/g, ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
}

export { dateLong, dateShort, capitalizeFirstLetter }
