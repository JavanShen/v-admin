import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';

Vue.use(Vuex);

// 自动引入所有的模块
const req = require.context('@/store/module', false, /\.js$/);
const modules = req.keys().reduce((modules, module) => {
  const name = module.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[name] = req(module).default;
  return modules;
}, {})

export default new Vuex.Store({
  state: {
    slideBarState: false,
  },
  getters,
  mutations: {
    toggleSlideBar(state) {
      state.slideBarState = !state.slideBarState;
    }
  },
  modules
});
