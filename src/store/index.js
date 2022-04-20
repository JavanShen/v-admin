import Vue from 'vue';
import Vuex from 'vuex';
import {loginByUserName,getUserInfo} from '@/api/login';
import {setToken} from '@/utils/auth';

import edit from './module/edit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    userInfo:{
      routes:[{
        path: '/',
        name: '首页',
        class: 'home',
      },{
        path: '/edit',
        name: '创作',
        class: 'edit',
      },{
        path: '/statistics',
        name: '统计',
        class: 'statistics',
      }]
    },

    slideBarState:false,
  },
  getters:{
    isLogin: state => !!state.token,
    isRoute: state => state.userInfo.role!==undefined,
    menus: state => state.userInfo.routes,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    toggleSlideBar(state){
      state.slideBarState = !state.slideBarState;
    }
  },
  actions: {
    login({ commit }, data) {
      return loginByUserName(data).then(res => {
        let data=res.data;
        if(data.code===0){
          commit('setToken', data.data.token);
          setToken(data.data.token);
          return data.data.token;
        }else{
          return Promise.reject(data.msg);
        }
      })
    },
    getUserInfo({ commit }, token) {
      return getUserInfo(token).then(res => {
        let data=res.data;
        if(data.code===0){
          commit('setUserInfo', data.data);
          return data.data;
        }else{
          return Promise.reject(data.msg);
        }
      })
    }
  },
  modules: {
    edit
  },
});
