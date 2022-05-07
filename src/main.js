import Vue from 'vue';
import App from './App.vue';

import router from './router';
import './permission';

import store from './store';

import Element from 'element-ui';
import '@/theme/style/theme/index.css';

import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent
} from 'echarts/components';
import { PieChart, BarChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import 'animate.css';
import '@/styles'

import '../mock/api';

import './IconSvg'

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  PieChart,
  BarChart,
  LabelLayout,
  CanvasRenderer
])

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
