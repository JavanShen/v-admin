import Mock from 'mockjs';

let tagHistory=[
    {
        id:1,
        name:'菠萝',
    },
    {
        id:2,
        name:'苹果',
    },
    {
        id:3,
        name:'香蕉',
    }
]

Mock.mock('/todo/getHistory',{
    code:0,
    data:tagHistory
})