import ability from "./ability";

export const canNavigate = (to) =>
  to.matched.some((route) => {
    if (route.meta.resource) {
      return ability.can(route.meta.action || "read", route.meta.resource);
    }
    return true;
  });

export const _ = undefined;
