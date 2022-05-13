<template>
    <div>
        <date-picker @change="dateConfirm">
            <div class="content">
                <svg-icon class="icon" icon-class="time"></svg-icon>
                <span>{{date}}</span>
            </div>
        </date-picker>
    
        <repeat-picker @change="repeatChange">
            <div class="content">
                <svg-icon class="icon" icon-class="repeat"></svg-icon>
                <span>{{repeat}}</span>
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
    data() {
        return {
            date: "设定日期",
            repeat: "不重复",
        }
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
    methods: {
        dateConfirm(date) {
            if(isSameDay(date)) {
                this.date='今天';
            }else if(isSameYear(date)){
                this.date=getDateZh(date).slice(5);
            }else{
                this.date=getDateZh(date);
            }
        },
        repeatChange(days) {
            switch(days) {
                case 0:
                    this.repeat='不重复';
                    break;
                case 1:
                    this.repeat='每天';
                    break;
                case 7:
                    this.repeat='每周';
                    break;
                case 30:
                    this.repeat='每月';
                    break;
                default:
                    this.repeat=`每${days}天`;
            }
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
    cursor: pointer;
}

.content:hover{
    background-color: #e9e9e9;
}

.icon{
    margin-right: 5px;
}

.icon:not(:first-child){
    margin-left: 18px;
}
</style>