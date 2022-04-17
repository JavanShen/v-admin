import Vue from 'vue';
import VueRouter from 'vue-router';
import {getToken} from '@/utils/auth';
import store from '@/store';
import {fixedRoutes,asyncRoutes} from '@/router/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[...fixedRoutes,...asyncRoutes],
});

export default router;
