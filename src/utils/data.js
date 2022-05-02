//处理数据
export function splitData(data,size=5){
    let result = [];
    let len = data.length;
    let n = Math.ceil(len/size);
    for(let i=0;i<n;i++){
        let start = i*size;
        let end = start + size;
        result.push(data.slice(start,end));
    }
    return result;
}