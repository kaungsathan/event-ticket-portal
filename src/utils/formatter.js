import moment from "moment"

const dateLong = (val) => {
  if (val) return moment(val).format("DD MMM YYYY, h:mm:ss A")
  return ""
}

const dateShort = (val) => {
  if (val) return moment(val).format("DD MMM YYYY")
  return ""
}

export { dateLong, dateShort }
