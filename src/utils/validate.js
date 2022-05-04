/**
 * 
 * @param {string} path - 路径
 * @returns {Boolean} - 是否是合法的路径
 */

export function isExternal(path){
    return /^(https?:|mailto:|tel:)/.test(path);
}

export function isSpecifedSize(file,size){
    return file.size<=size;
}

export function isSameObject(obj1,obj2,isStrict=false){
    if(isStrict){
        return JSON.stringify(obj1)===JSON.stringify(obj2);
    }else{
        const isSame=(obj)=>{
            for(let key in obj){
                if(typeOf(obj[key])==='object'){
                    if(!isSame(obj[key])){
                        return false;
                    }
                }else if(obj[key]!==obj2[key]){
                    return false;
                }
            }
            return true
        }

        return isSame(obj1);
    }
}

export function typeOf(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}