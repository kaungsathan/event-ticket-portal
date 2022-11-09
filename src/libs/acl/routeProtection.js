import ability from "./ability"

export const canNavigate = (to) =>
  to.matched.some((route) => {
    if (route.meta.subject) {
      return ability.can(route.meta.action, route.meta.subject)
    }
    return true
  })

export const _ = undefined
