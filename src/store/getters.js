const getters={
    roles:state=>state.user.userInfo?.roles,
    menus:state=>state.permission.routes
}

export default getters