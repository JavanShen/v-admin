export const fixedRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
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
                component: () => import(/* webpackChunkName: "Statistics" */ '@/views/Statistics.vue'),
            }
        ]
    }
]