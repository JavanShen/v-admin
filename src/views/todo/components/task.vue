<template>
    <el-card :shadow="shadowType" :body-style="{ padding: '20px' }">
        <el-row type="flex" align="middle">
            <el-col :span="1" :offset="0">
                <el-checkbox
                    v-model="isComplete"
                    :indeterminate="false"
                ></el-checkbox>
            </el-col>
            <el-col :span="23" :offset="0">
                <el-input
                    v-model="taskContent"
                    placeholder="新建任务"
                    size="normal"
                    clearable
                ></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <Tag :tag-data="tagData" :tag-history="tagHistory" @addTag="addTag"></Tag>
            </el-col>
        </el-row>
        <el-row class="info" type="flex" align="middle">
            <el-col :span="8" :offset="0">
                <Info @change="changeInfo"></Info>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import DatePicker from "@/components/picker/DatePicker.vue";
import Tag from "@/components/Tag";
import Info from "./Info.vue"

export default {
    name: "Task",
    components: {
        DatePicker,
        Tag,
        Info,
    },
    props: {
        shadowType: {
            type: String,
            default: "never",
        },
    },
    data() {
        return {
            isComplete: false,
            taskContent: "",

            tagData: [],
            tagHistory: [],

            info:{}
        }
    },
    methods: {
        changeInfo(info) {
            this.info=info;
        },
        addTag(){
            
        }
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

.info {
    text-align: left;
}
</style>