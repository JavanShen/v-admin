<template>
    <div class="todo">
        <Task class="create-task" type="create" shadow-type="hover" @addTask="addTask"></Task>

        <el-divider>
            <el-button type="primary" plain circle size="small" @click="open" icon="el-icon-date"></el-button>
        </el-divider>

        <Task class="view-task" v-for="task in tasks" shadow-type="hover" type="view" :task-data="task" :key="task.id"></Task>
        <el-drawer
            title="日程安排"
            :visible.sync="isOpen"
            direction="rtl"
            size="660px"
            :destroy-on-close="true"
            :show-close="true"
            :wrapperClosable="true"
        >
            <Calendar :dates="dates"></Calendar>
        </el-drawer>
    </div>
</template>

<script>
import Calendar from "@/components/date/Calendar";
import Task from "./components/Task";
import {getTasks, addTask} from '@/api/todo';

export default {
    name: "Todo",
    components: {
        Calendar,
        Task
    },
    data() {
        return {
            isOpen: false,
            dates: "repeat",

            tasks: []
        };
    },
    created() {
        this.getTasks();
    },
    methods: {
        open() {
            this.isOpen = !this.isOpen;
        },
        addTask(info) {
            addTask(info).then(({data:res}) => {
                if (res.code === 0) {
                    this.getTasks();
                }
            });
        },
        getTasks(){
            getTasks().then(res => {
                let {data} = res.data
                this.tasks = data;
            });
        }
    },
};
</script>

<style scoped>
.view-task {
    margin-bottom: 10px;
}

.open-btn {
    cursor: pointer;
}
</style>