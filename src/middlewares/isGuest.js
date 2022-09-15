export default function isAuth({ next, store }) {
  if (store.isAuth) {
    return next({ name: "dashboard" })
  }
  return next()
}
