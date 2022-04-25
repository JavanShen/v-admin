export const fixedRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        hidden: true,
        meta:{icon:'statistics'}
    }
]

export const asyncRoutes = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/layout'),
        children: [
            {
                path: 'statistics',
                name: 'Statistics',
                component: () => import('@/views/Statistics.vue'),
                meta:{title: '统计',icon: 'statistics', roles: ['admin','editor','user']}
            },
            {
                path: 'edit',
                name: 'Edit',
                component: () => import('@/views/Edit.vue'),
                meta: {title: '编辑', icon: 'edit', roles: ['admin','editor']}
            },
            {
                path: 'assets',
                name: 'Assets',
                component: () => import('@/views/Edit.vue'),
                meta: {title: '资产', icon: 'edit', roles: ['admin']},
                children:[
                    {
                        path: 'assets-list',
                        name: 'AssetsList',
                        component: () => import('@/views/Edit.vue'),
                        meta: {title: '资产列表', roles: ['admin']}
                    }
                ]
            },
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/Edit.vue'),
                meta: {title: '用户', icon: 'edit', roles: ['admin']}
            },
            {
                path: 'nester',
                name: 'Nester',
                component: () => import('@/views/Edit.vue'),
                meta: {title: '嵌套测试', icon: 'edit', roles: ['admin']},
                children: [
                    {
                        path: 'nester/nested',
                        name: 'Nested',
                        component: () => import('@/views/Edit.vue'),
                        meta: {title: '子元素1', roles: ['admin'], group: 'first'}
                    },
                    {
                        path: 'nested2',
                        name: 'Nested2',
                        component: () => import('@/views/Edit.vue'),
                        meta: {title: '子元素2', roles: ['admin'], group: 'first'}
                    },
                    {
                        path: 'nested3',
                        name: 'Nested3',
                        component: () => import('@/views/Edit.vue'),
                        meta: {title: '子元素3',roles: ['admin']}
                    },
                    {
                        path: 'nested4',
                        name: 'Nested4',
                        component: () => import('@/views/Edit.vue'),
                        meta: {title: '子元素4', roles: ['admin'], group: 'second'}
                    },
                    {
                        path: 'nested5',
                        name: 'Nested5',
                        component: () => import('@/views/Edit.vue'),
                        meta: {title: '子元素5', roles: ['admin'], group: 'second'},
                        children: [
                            {
                                path: 'nested6',
                                name: 'Nested6',
                                component: () => import('@/views/Edit.vue'),
                                meta: {title: '子元素6', roles: ['admin']}
                            }
                        ]
                    }
                ]
            }
        ]
    }
]