import Vue from 'vue';
import IconSvg from './IconSvg.vue';

Vue.component('icon-svg', IconSvg);

// 批量导入svg图标
const req=require.context('./svg',false,/\.svg$/)
req.keys().map(req)