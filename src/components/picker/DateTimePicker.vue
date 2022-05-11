<template>
    <el-date-picker :value="time" type="datetime" size="normal" placeholder="选择日期时间">
    </el-date-picker>
    
</template>

<script>
export default {
    name: "DateTimePicker",
    props: {
        time: {
            type: Date,
            default: () => new Date()
        },
    }
}
</script>