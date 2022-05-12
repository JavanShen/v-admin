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
                    :value="value"
                    placeholder="新建任务"
                    size="normal"
                    clearable
                    @input="handelInputBlur"
                ></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <Tag></Tag>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="8" :offset="0">
                <date-time-picker class="date-time-picker" size="small"></date-time-picker>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import DateTimePicker from "@/components/picker/DateTimePicker";
import Tag from "@/components/Tag";

export default {
    name: "Task",
    components: {
        DateTimePicker,
        Tag,
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
        value: {
            type: String,
            default: "",
        },
    },
    methods: {
        handelInputBlur(val) {
            console.log(val)
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