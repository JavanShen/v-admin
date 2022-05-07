import {fixedRoutes,asyncRoutes} from '@/router/routes.js'

// 检查是否有权限
function hasPermission(roles, route) {
    if (route.meta?.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
}

// 递归遍历进行路由筛选
function getRoutes(roles,routes) {
    let res=[]
    routes.forEach(route=>{
        if(route.children){
            route.children = getRoutes(roles,route.children)
        }

        if(hasPermission(roles,route)){
            res.push({...route})
        }
    })
    return res
}

const state=() => {
    return {
        routes:[],
        addRoutes:[]
    }
}

const mutations={
    setRoutes(state,routes){
        state.addRoutes=routes
        state.routes=fixedRoutes.concat(routes[0]?.name==='Layout'?routes[0].children:routes)
    },
    clearRoutes(state){
        state.routes=[]
        state.addRoutes=[]
    }
}

const actions={
    generateRoutes({commit},roles){
        return new Promise(resolve=>{
            // admin角色可以访问所有路由
            let accessedRoutes=roles.includes('admin')?asyncRoutes:getRoutes(roles,asyncRoutes)
            commit('setRoutes',accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}