<template>
    <div>
        <date-picker :date="infoDate" @change="dateConfirm">
            <div class="content" :class="{'active':isEdit}">
                <svg-icon class="icon" icon-class="time"></svg-icon>
                <span>{{date|dateType}}</span>
            </div>
        </date-picker>
    
        <repeat-picker :days="infoRepeat" @change="repeatChange">
            <div class="content" :class="{'active':isEdit}">
                <svg-icon class="icon" icon-class="repeat"></svg-icon>
                <span>{{repeat|repeatType}}</span>
            </div>
        </repeat-picker>
    </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import RepeatPicker from "./RepeatPicker.vue";
import {getDateZh, isSameDay, isSameYear} from "@/utils/date";

export default {
    name: "Info",
    components: {
        DatePicker,
        RepeatPicker,
    },
    inject: ['isEdit'],
    props: {
        infoDate: {
            type: Date,
            default: new Date(),
        },
        infoRepeat: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            date: new Date(),
            repeat: 0,
        }
    },
    created (){
        this.date = this.infoDate;
        this.repeat = this.infoRepeat;
    },
    watch: {
        date(val) {
            this.$emit("change", {
                date: val,
                repeat: this.repeat,
            });
        },
        repeat(val) {
            this.$emit("change", {
                date: this.date,
                repeat: val,
            });
        },
    },
    filters: {
        repeatType(val) {
            switch(val) {
                case 0:
                    return '不重复';
                case 1:
                    return '每天';
                case 7:
                    return '每周';
                case 30:
                    return '每月';
                default:
                    return `每${val}天`;
            }
        },
        dateType(date) {
            if(isSameDay(date)) {
                return '今天';
            }else if(isSameYear(date)){
                return getDateZh(date).slice(5);
            }else{
                return getDateZh(date);
            }
        }
    },
    methods: {
        dateConfirm(date) {
            this.date = date;
        },
        repeatChange(days) {
            this.repeat=days
        },
    },
}
</script>

<style scoped>
.content{
    display: inline-block;
    padding: 5px 8px;   
    border-radius: 6px;
    text-align: left;
}

.active{
    cursor: pointer;
}

.active:hover{
    background-color: #e9e9e9;
}

.icon{
    margin-right: 5px;
}

.icon:not(:first-child){
    margin-left: 18px;
}
</style>