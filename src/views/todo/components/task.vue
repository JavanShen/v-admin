<template>
    <el-card :class="{'complete':isComplete}" :shadow="shadowType" :body-style="{ padding: '20px' }">
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
                    :class="{'disabled-input': type==='view'}"
                    :readonly="type==='view'"
                    placeholder="新建任务"
                    size="normal"
                    clearable
                ></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <Tag
                    :tag-data="tagData"
                    :tag-history="tagHistory"
                    @addTag="addTag"
                    @chooseTag="chooseTag"
                    @deleteTag="deleteTag"
                    @deleteHistoryTag="deleteHistoryTag"
                ></Tag>
            </el-col>
        </el-row>
        <el-row class="info" type="flex" justify="space-between" align="middle">
            <el-col :span="8" :offset="0">
                <Info :info-date="info.date" :info-repeat="info.repeat" @change="changeInfo"></Info>
            </el-col>
            <el-col :span="1" :offset="0">
                <el-button v-if="type==='create'" type="primary" class="add-btn" size="small" circle icon="el-icon-plus" @click="addTask"></el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import DatePicker from "@/components/picker/DatePicker.vue";
import Tag from "@/components/Tag";
import Info from "./Info.vue";

import { addTag, deleteTag, getHistory } from "@/api/todo";

export default {
    name: "Task",
    components: {
        DatePicker,
        Tag,
        Info,
    },
    provide() {
        return {
            isEdit: this.type === 'create' || this.type === 'edit',
        };
    },
    props: {
        shadowType: {
            type: String,
            default: "never",
        },
        type: {
            type: String,
            default: 'create',
        },
        taskData: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isComplete: false,
            taskContent: "",

            tagData: [],
            tagHistory: [],

            info: {
                date: new Date(),
                repeat: 0
            },
        };
    },
    created() {
        if(this.type==='edit'||this.type==='view'){
            let {taskContent,isComplete,tagData,info}=this.taskData;
            this.taskContent = taskContent||'';
            this.isComplete = isComplete||false;
            this.tagData = tagData||[];
            this.info = info?{...info,date:new Date(info.date)}:{
                date: new Date(),
                repeat: 0
            };
        }
        this.getHistoryTag();
    },
    methods: {
        changeInfo(info) {
            this.info = info;
        },
        async getHistoryTag() {
            const { data: res } = await getHistory();
            if (res.code === 0) {
                this.tagHistory = [...res.data];
            }
        },
        async deleteHistoryTag(id) {
            const { data: res } = await deleteTag(id);
            if (res.code === 0) {
                this.tagHistory.splice(this.searchHistoryTagById(id), 1);
            } else {
                this.$message.error(res.msg);
            }
        },
        deleteTag(id) {
            this.tagData.splice(this.searchTagById(id), 1);
            this.tagHistory[this.searchHistoryTagById(id)].selected = false;
        },
        addTag(tags, isNew) {
            if (isNew) {
                this.addTagsAsync(tags).then((res) => {
                    res.forEach((item) => {
                        if (item.code === 0) {
                            this.tagData.push(item.data);

                            let index = this.searchHistoryTagById(item.data.id);
                            index > -1
                                ? (this.tagHistory[index].selected = true)
                                : this.tagHistory.push({
                                      ...item.data,
                                      selected: true,
                                  });
                        }
                    });
                });
            } else {
                this.tagData = [...this.tagData, ...tags];
            }
        },
        addTagsAsync(tags) {
            let promiseArr = tags.map((tag) => {
                return new Promise((resolve, reject) => {
                    addTag(tag)
                        .then((res) => {
                            resolve({ ...res.data, name: tag });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            });
            return Promise.all(promiseArr);
        },
        chooseTag(id) {
            let index = this.searchHistoryTagById(id);
            if (index > -1) {
                let type = this.tagHistory[index].selected;
                this.tagHistory.splice(index, 1, {
                    ...this.tagHistory[index],
                    selected: !type,
                });

                if (!type) {
                    this.tagData.push(this.tagHistory[index]);
                } else {
                    let index = this.searchTagById(id);
                    index > -1 && this.tagData.splice(index, 1);
                }
            }
        },
        addTask(){
            if(this.taskContent){
                this.$emit("addTask", {
                    isComplete: this.isComplete,
                    taskContent: this.taskContent,
                    tagData: this.tagData,
                    info: this.info,
                });

                this.dataReset()

                this.getHistoryTag()
            }
        },
        //utils
        searchTagById(id, isIndex = true) {
            if (isIndex) {
                return this.tagData.findIndex((item) => item.id === id);
            }
            return this.tagData.find((item) => item.id === id);
        },
        searchHistoryTagById(id, isIndex = true) {
            if (isIndex) {
                return this.tagHistory.findIndex((item) => item.id === id);
            }
            return this.tagHistory.find((item) => item.id === id);
        },
        dataReset(target=this.$data,source=this.$options.data()) {
            for(let key in source){
                if(target[key]!==source[key]){
                    if(typeof source[key]==='object'){
                        for(let key2 in source[key]){
                            this.$set(this[key],key2,key2==='date'?new Date():source[key][key2]);
                        }
                    }

                    target[key]=source[key];
                }
            }
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

.info {
    text-align: left;
}

.add-btn{
    box-shadow: 0 1px 2px 1px rgba(214, 214, 214, 0.7);
}

.disabled-input >>> input{
    cursor: default;
    border: none;
    font-size: 16px;
    padding: 0;
}

.complete {
    opacity: 0.5;
}
</style>