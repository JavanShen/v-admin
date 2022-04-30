import service from '@/utils/request';

export function uploadFile(data){
    return service({
        url: '/upload',
        method: 'post',
        data
    })
}

export function submitArticle(data){
    return service({
        url: '/article/submit',
        method: 'post',
        data
    })
}