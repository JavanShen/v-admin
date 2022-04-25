import router from './router';
import store from './store';

import { getToken } from '@/utils/auth';

router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        const token = getToken();
        if (token === undefined) {
            next({ name: 'Login' });
        } else {
            if (store.getters.roles?.length > 0) {
                next();
            } else {
                try {
                    const {roles} = await store.dispatch('user/getUserInfo', token)
                    const routes = await store.dispatch('permission/generateRoutes', roles)

                    routes.forEach(route => router.addRoute(route))
                    router.addRoute(
                        {
                            path: '*',
                            name: 'NotFound',
                            component: () => import('@/views/NotFound.vue'),
                        }
                    )
                    console.log(router.getRoutes())

                    next({ ...to, replace: true });
                } catch (e) {
                    console.log(e)
                    next({ name: 'Login' });
                }
            }
        }
    }
});

export default router;