import { fileToBase64 } from "../utils/file";

const getters={
    roles:state=>state.user.userInfo?.roles,
    menus:state=>state.permission.routes,
    previewImages:async state=>{
        console.log(state.edit.files)
        let images=[];
        for(let file of state.edit.files){
            let info=file.raw
            if(info.type.indexOf('image')!==-1){
                let base64=await fileToBase64(info);
                images.push({
                    id:info.uid,
                    name:info.name,
                    src:base64
                })
            }
        }
        return images;
    }
}

export default getters