export function setStore(data={}){
    for(let key in data){
        if(data.hasOwnProperty(key)){
            let value=data[key];
            if(typeof value==='object'){
                value=JSON.stringify(value);
            }
            localStorage.setItem(key,value);
        }
    }
}

export function getStore(key){
    let value=localStorage.getItem(key);
    if(value){
        try{
            value=JSON.parse(value);
        }catch(e){
            //
        }
    }
    return value;
}