<template>
    <el-popover
        placement="bottom"
        trigger="click"
        :disabled="!isEdit">
        <div class="switch">
            <span class="title">是否重复:</span>
            <el-switch v-model="isRepeat"></el-switch>
        </div>
        <div class="days" v-if="isRepeat">
            <span>每</span>
            <el-input-number class="input-number" v-model="dayNum" :min="1" :max="100" size="mini"></el-input-number>
            <span>天重复</span>
        </div>
        <slot slot="reference"></slot>
    </el-popover>
</template>

<script>
export default {
    name: "RepeatPicker",
    data() {
        return {
            isRepeat: false,
        };
    },
    props: {
        days: {
            type: Number,
            default: 0,
        },
    },
    inject: ['isEdit'],
    watch: {
        isRepeat(val) {
            if(val){
                this.dayNum = 1;
            }else{
                this.dayNum = 0;
            }
        },
        days(val) {
            val===0 && (this.isRepeat = false);
        }
    },
    computed: {
        dayNum: {
            get: function() {
                return this.days;
            },
            set: function(val) {
                this.$emit("change", val);
            },
        },
    }
}
</script>

<style scoped>
.switch {
    display: flex;
    align-items: center;
    justify-content: center;
}

.days {
    margin-top: 5px;
}

.title {
    font-size: 14px;
    color: #848484;
    margin-right: 10px;
}

.input-number {
    width: 100px;
    margin: 0 5px;
}
</style>