export default function isAuth({ next, store }) {
  if (!store.isAuth) {
    store.logout();
    return next({ name: "login" });
  }
  return next();
}
