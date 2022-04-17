import Vue from 'vue';
import App from './App.vue';

import router from './router';
import permission from './permission';

import store from './store';

import Element from 'element-ui';
import '@/theme/style/theme/index.css';

import * as echarts from 'echarts';

import '../mock/api';

Vue.config.productionTip = false;
Object.defineProperties(Vue.prototype, {
  $echarts: {
    get() {
      return echarts;
    }
  }
});

Vue.use(Element);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
