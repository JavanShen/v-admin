<template>
    <div>
        <div class="top">
            <el-progress class="progress" type="line" :percentage="percent" :stroke-width="10"></el-progress>
            <slot name="tail"></slot>
        </div>
        <div class="info">
            <slot name="info"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
    props: {
        percent: {
            type: Number,
            default: 0,
        },
    },
}
</script>

<style scoped>
.top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

.progress {
    width: 100%;
    margin-right: 10px;
}

.info {
    text-align: right;
}
</style>