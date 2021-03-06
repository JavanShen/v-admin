import Vue from 'vue';
import VueRouter from 'vue-router';
import {fixedRoutes} from '@/router/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[...fixedRoutes],
});

export default router;
