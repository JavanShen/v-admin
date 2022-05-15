<template>
    <el-popover
        placement="bottom"
        trigger="click"
        :disabled="!isEdit">
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
    inject: ['isEdit'],
    methods: {
        handelChange(date) {
            this.$emit("change", date);
        },
    },
}
</script>