export default {
  delLocalStorage(a) {
    localStorage.removeItem(a);
  },
  setLocalStorage(a, v) {
    localStorage.setItem(a, JSON.stringify(v));
  },
  getLocalStorage(v) {
    let u = localStorage.getItem(v);
    if (u && u != 'undefined') return JSON.parse(u);
  },

  localStorageClear() {
    sessionStorage.clear();
  },

  setSessionStorage(a, v) {
    sessionStorage.setItem(a, JSON.stringify(v));
  },
  getSessionStorage(a) {
    let u = sessionStorage.getItem(a);
    if (u) return JSON.parse(u);
  },

  sessionStorageClear() {
    sessionStorage.clear();
  }
};
