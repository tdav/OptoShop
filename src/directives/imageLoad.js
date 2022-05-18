import Vue from 'vue';

Vue.directive('loadedifcomplete', {
  bind(el, binding) {
    // if (!el.complete) {
    //   el.src = '../../public/img/icons/favicon-32x32.png';
    //   //   el.src = binding.value;
    // }
  }
});
