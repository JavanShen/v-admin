const state=() => ({
    editor:null,
    files: []
})

const mutations={
    setEditor(state,editor){
        state.editor=editor;
    },
    setFiles(state,files){
        state.files=files;
    },
    addFile(state,file){
        state.files.push(file);
    }
}

export default{
    namespaced:true,
    state,
    mutations
}