import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import ru from 'vuetify/src/locale/ru.ts';

import {
  VApp,
  VBtn,
  VBtnToggle,
  VCard,
  VCheckbox,
  VDivider,
  VGrid,
  VIcon,
  VList,
  VProgressLinear,
  VTextField
} from 'vuetify';

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: {
      ru
    },
    current: 'ru'
  },
  components: {
    VApp,
    VBtn,
    VBtnToggle,
    VCard,
    VCheckbox,
    VDivider,
    VGrid,
    VIcon,
    VList,
    VProgressLinear,
    VTextField
  },

  theme: {
    primary: '#3949AB',
    secondary: '#626573',
    accent: '#626573',
    // accent: '#9c27b0',
    error: '#f67563',
    warning: '#fb8c00',
    info: '#2196f3',
    success: '#4caf50'
  }
});