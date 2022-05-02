import Mock from 'mockjs';

Mock.mock('/user/list',{
    'code':0,
    'data|100':[{
        'id|+1':1,
        'name':'@cname',
        'age|1-100':1,
        'birthday':'@date',
        'address':'@county(true)',
        'email':'@email',
        'phone':'@integer(1,1000000000)'
    }]
})