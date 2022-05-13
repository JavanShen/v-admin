<template>
    <div class="todo">
        <Task></Task>

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
        };
    },
    methods: {
        open() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>