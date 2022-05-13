const state=() => ({
    tasks: [],

    tagHistory: [],
})

const mutations={
    setTasks(state,tasks){
        state.tasks=tasks;
    },
    addTask(state,task){
        state.tasks.push(task);
    },
}

export default{
    namespaced:true,
    state,
    mutations
}