import service from '@/utils/request';

export function addTag(info) {
    return service({
        url: '/todo/addTag',
        method: 'post',
        data: info
    })
}

export function deleteTag(info) {
    return service({
        url: '/todo/deleteTag',
        method: 'post',
        data: info
    })
}

export function getHistory() {
    return service({
        url: '/todo/getHistory',
        method: 'get'
    })
}

export function getTasks() {
    return service({
        url: '/todo/getTasks',
        method: 'get'
    })
}

export function addTask(info) {
    return service({
        url: '/todo/addTask',
        method: 'post',
        data: info
    })
}