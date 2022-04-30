export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export function splitFileByNum(file,num=100){
    return new Promise((resolve,reject) => {
        const reader= new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload= (e) => {
            let buffer=e.target.result,
            result=[],
            size=Math.ceil(buffer.byteLength/num),
            start=0,
            end=start+size

            for(let i=0;i<num;i++){
                result.push(buffer.slice(start,end))
                start=end
                end=start+size
            }

            resolve(result)
        }
        reader.onerror= error => reject(error);
    })
}

export function splitFileBySize(file,size=1024*1024*10){
    return new Promise((resolve,reject) => {
        const reader= new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload= (e) => {
            let buffer=e.target.result,
            result=[],
            len=buffer.byteLength,
            start=0,
            end=start+size

            while(start<len){
                result.push(buffer.slice(start,end))
                start=end
                end=start+size
            }

            resolve(result)
        }
        reader.onerror= error => reject(error);
    })
}