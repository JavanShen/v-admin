<template>
    <div id="pie" ref="pie"></div>
</template>

<script>
export default {
    name: "Pie",
    props: {
        data: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            chart: null,
            options: {
                legend: {
                    top: "bottom",
                },
                dataset: {},
                series: [
                    {
                        name: "Nightingale Chart",
                        type: "pie",
                        radius: [30, 150],
                        center: ["50%", "50%"],
                        roseType: "area",
                        itemStyle: {
                            borderRadius: 8,
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.chart = this.$echarts.init(this.$refs.pie);
        this.options.dataset.source=this.data
        this.chart.setOption(this.options);
    },
};
</script>

<style scoped>
#pie {
    height: 600px;
    width: 600px;
}
</style>