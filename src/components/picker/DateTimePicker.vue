<template>
    <el-date-picker :value="time" type="datetime" :picker-options="pickerOptions" :size="size" placeholder="选择日期时间">
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
        size: {
            type: String,
            default: "normal"
        },
    },
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ]
            },
        }
    }
}
</script>