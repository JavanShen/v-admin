import { fileToBase64,splitFileBySize } from "../utils/file";

const getters={
    roles:state=>state.user.userInfo?.roles,
    menus:state=>state.permission.routes,

    previewImages:async state=>{
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
    },
    fileList:state=>state.edit.files,
    splitFileList: async state=>{

    },
    fileState:state=>state.edit.fileState,

    editorContent: state=>state.edit.editor.value()
}

export default getters