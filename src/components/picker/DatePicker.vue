<template>
    <el-date-picker :value="date" type="date" :size="size" placeholder="选择日期">
    </el-date-picker>
</template>

<script>
export default {
    name: "DatePicker",
    props: {
        date: {
            type: Date,
            default: () => new Date()
        },
        size: {
            type: String,
            default: "normal"
        },
    },
}
</script>