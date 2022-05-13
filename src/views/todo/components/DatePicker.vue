<template>
    <el-popover
        placement="bottom"
        trigger="click">
        <date-panel v-model="date" :show-time="false" @change="handelChange"></date-panel>
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
    data() {
        return {
            date: new Date(),
        };
    },
    created() {
        this.$emit("change", this.date);
    },
    methods: {
        handelChange(date) {
            this.$emit("change", date);
        },
    },
}
</script>