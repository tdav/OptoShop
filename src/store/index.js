import Vue from 'vue';
import Vuex from 'vuex';
import userDS from './userDS';
import ordersDS from './ordersDS';

import aboutDS from './aboutDS';
import bannersDS from './bannersDS';
import brandsDS from './brandsDS';
import cartsDS from './cartsDS';
import categoriesDS from './categoriesDS';
import distributorsDS from './distributorsDS';
import driverDS from './driverDS';
import paidDS from './paidDS';
import productsDS from './productsDS';
import shippingAcceptDS from './shippingAcceptDS';
import statisticsDS from './statisticsDS';
import tradePointsDS from './tradePointsDS';
import favoriteDS from './favoriteDS';
import subCategories from './subCategoriesDS';
import shared from './shared';
import geolocation from './geolocation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shared,
    aboutDS,
    bannersDS,
    brandsDS,
    cartsDS,
    categoriesDS,
    distributorsDS,
    driverDS,
    ordersDS,
    paidDS,
    productsDS,
    shippingAcceptDS,
    statisticsDS,
    tradePointsDS,
    favoriteDS,
    subCategories,
    geolocation,
    userDS
  }
});
