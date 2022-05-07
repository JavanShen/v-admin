//用户信息
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginByUserName, getUserInfo } from '@/api/login'

const state = () => {
    return {
        token: getToken(),
        userInfo: {}
    }
}

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
}

const actions = {
    login({ commit }, data) {
        return loginByUserName(data).then(res => {
            let data = res.data;
            if (data.code === 0) {
                commit('setToken', data.data.token);
                setToken(data.data.token);
                return data.data.token;
            } else {
                return Promise.reject(data.msg);
            }
        })
    },
    logout({ commit }) {
        commit('setToken', '');
        commit('setUserInfo', {});
        removeToken();
    },
    getUserInfo({ commit }, token) {
        return getUserInfo(token).then(res => {
            let data = res.data;
            if (data.code === 0) {
                commit('setUserInfo', data.data);
                return data.data;
            } else {
                return Promise.reject(data.msg);
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}