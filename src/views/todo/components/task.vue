<template>
    <el-card :shadow="shadowType" :body-style="{ padding: '20px' }">
        <el-row type="flex" align="middle">
            <el-col :span="1" :offset="0">
                <el-checkbox
                    :value="isComplete"
                    :indeterminate="false"
                    @change="handelCheckChange"
                ></el-checkbox>
            </el-col>
            <el-col :span="23" :offset="0">
                <el-input
                    v-model="taskContent"
                    placeholder="新建任务"
                    size="normal"
                    clearable
                    @change="handelInputChange"
                ></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" :offset="0">
                <date-time-picker class="date-time-picker"></date-time-picker>
            </el-col>
            
        </el-row>
    </el-card>
</template>

<script>
import DateTimePicker from "@/components/picker/DateTimePicker";

export default {
    name: "Task",
    components: {
        DateTimePicker
    },
    props: {
        shadowType: {
            type: String,
            default: "never",
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
        taskContent: {
            type: String,
            default: "",
        },
    },
    methods: {
        handelInputChange(val) {
            this.$emit("input", val);
        },
        handelCheckChange(val) {
            this.$emit("update:isComplete", val);
        },
    },
};
</script>

<style scoped>
.date-time-picker {
    width: 100%;
}

.el-row:not(:last-child) {
    margin-bottom: 10px;
}
</style>