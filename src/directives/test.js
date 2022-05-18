import Vue from 'vue';

Vue.directive('tack', {
  bind(el, binding, vnode) {
    el.style.position = 'fixed';
  }
});
