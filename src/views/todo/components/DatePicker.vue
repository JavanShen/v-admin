<template>
    <el-popover
        placement="bottom"
        trigger="click"
        :disabled="!isEdit">
        <date-panel v-model="innerDate" :show-time="false"></date-panel>
        <slot slot="reference"></slot>
    </el-popover>
</template>

<script>
import DatePanel from "@/components/date/DatePanel.vue";

export default {
    name: "DatePicker",
    components: {
        DatePanel,
    },
    props: {
        date: {
            type: Date,
            default: () => new Date(),
        }
    },
    inject: ['isEdit'],
    computed: {
        innerDate: {
            get() {
                return this.date;
            },
            set(val) {
                this.$emit("change", val);
            },
        },
    },
}
</script>