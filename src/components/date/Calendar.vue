<template>
    <el-calendar v-model="date" :first-day-of-week="1">
        <template
            slot="dateCell"
            slot-scope="{date,data}">
            <p class="content">
                <span>{{date.getDate()}}</span>
                <i class="tip" :class="{'tip-color-dodge':data.type!=='current-month'}" v-if="isShowTip(date)"></i>
            </p>
        </template>
    </el-calendar>
</template>

<script>
import {today, todayStart} from "@/utils/date";

export default {
    name: "Calendar",
    data() {
        return {
            date: new Date(),
        }
    },
    props: ['dates'],
    methods: {
        isShowTip(date) {
            let {dates} =this

            if(dates==='all') return true
            if(dates==='month') return date.getMonth()===today.getMonth()
            if(dates==='repeat') return date.getTime()>=todayStart.getTime()

            if(Array.isArray(dates)&&dates.length>0) {
                return dates.some(item=>{
                    return item.getTime()===date.getTime()
                })
            }

            return false
        }
    }
}
</script>

<style scoped>
.content{
    position: relative;
    height: 100%;
    width: 100%;
}

.tip{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background: #f56c6c;
    border-radius: 50%;
}

.tip-color-dodge{
    opacity: 0.5;
}
</style>