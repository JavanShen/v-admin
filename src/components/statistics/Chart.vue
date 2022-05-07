<template>
    <div ref="chart"></div>
</template>

<script>
import {options} from '@/utils/echarts'

export default {
    name: "Chart",
    props: {
        data: {
            type: Array,
            require: true
        },
        type: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.chart = this.$echarts.init(this.$refs.chart);
        this.chart.setOption(options[this.type](this.data));
    }
}
</script>