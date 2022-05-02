const state=() => ({
    editor:null,

    files: [],
    fileState: 'ready'
})

const mutations={
    setEditor(state,editor){
        state.editor=editor;
    },
    setEditorContent(state,value){
        state.editor.value(value);
    },
    setFiles(state,files){
        state.files=files;
    },
    addFile(state,file){
        state.files.push(file);
    },
    clearFiles(state){
        state.files=[];
    },
    startUpload(state){
        state.fileState='uploading';
    },
    pauseUpload(state){
        state.fileState='pause';
    },
    continueUpload(state){
        state.fileState='uploading';
    },
    finishUpload(state){
        state.fileState='finish';
    }
}

export default{
    namespaced:true,
    state,
    mutations
}