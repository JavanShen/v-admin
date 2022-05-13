<template>
    <div class="date-panel">
        <date-panel ref="datePanel" @pick="pick"></date-panel>
    </div>
</template>
<script>
import DatePanel from "element-ui/packages/date-picker/src/panel/date.vue";

export default {
    props: {
        date: {
            default: new Date(),
            type: Date,
        },
        showTime: {
            default: false,
            type: Boolean,
        },
    },
    components: {
        DatePanel,
    },
    model: {
        prop: "date",
        event: "change",
    },
    mounted() {
        this.$refs.datePanel.value = this.date;
        this.$refs.datePanel.showTime = this.showTime;
        this.$refs.datePanel.visible = true;
    },
    methods: {
        pick(date) {
            this.$refs.datePanel.value = date;
            this.$refs.datePanel.resetView && this.$refs.datePanel.resetView();
            this.$emit("change", date);
        },
    },
};
</script>
<style scoped>
.date-panel >>> .el-picker-panel__footer {
    display: none !important;
}
.date-panel >>> .el-picker-panel {
    box-shadow: none;
    border: 0;
}
</style>