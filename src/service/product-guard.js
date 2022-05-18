import store from '../store/index';

export default function(to, from, next) {
  const cnt = store.getters.cartProductsCount;

  if (cnt != 0) {
    next();
  } else {
    next('/products');
  }
}
