import ss from './storage';

export default function(to, from, next) {
  const u = ss.getLocalStorage('user')||{};
  if (u) {
    next();
  } else {
    next('/login');
  }
}
