import service from '@/utils/request';

export function getUserList() {
    return service({
        url: '/user/list',
        method: 'get'
    })
}