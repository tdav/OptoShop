import store from '../store/index';

export default function share(text) {
  if ('share' in navigator) {
    navigator.share({
      title: document.title,
      text: text,
      url: ''
      //url: location.href
    });
  } else {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      store.dispatch('SET_MES', 'Url скопированный буфер обмена.');
    }
  }
}
