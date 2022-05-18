import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Registration from './views/Registration';
import AuthGuard from './service/auth-guard';

import ChangePassword from './views/ChangePassword';
import ProductList from './views/ProductList';
import OrdersList from './views/OrdersList';
import Support from './views/Support';
import Basket from './views/Basket';
import Balls from './views/Balls';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/',
      name: 'productsHome',
      component: Home,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },



    {
      path: '/products',
      name: 'products',
      component: ProductList,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/products/:url',
      name: 'products_url',
      component: ProductList,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/products/:id',
      name: 'products_by_id',
      component: ProductList,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '*',
      name: 'notfound',
      meta: {
        public: true
      },
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      meta: {
        public: true
      },
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        public: true
      },
      component: Login
    },



    {
      path: '/basket',
      name: 'basket',
      component: Basket,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/orders',
      name: 'orders',
      component: OrdersList,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/myball',
      name: 'myball',
      component: Balls,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/chpsw',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/support',
      name: 'Support',
      component: Support,
      meta: {
        public: false
      },
      beforeEnter: AuthGuard
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});