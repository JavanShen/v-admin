const state=() => ({
    editor:null
})

const mutations={
    setEditor(state,editor){
        state.editor=editor;
    }
}

export default{
    namespaced:true,
    state,
    mutations
}