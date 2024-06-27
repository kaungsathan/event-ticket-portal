import ability from './ability'

export const canNavigate = (to) => {
  if (to.meta.subject) {
    return ability.can(to.meta.action, to.meta.subject)
  }
  return true
}
