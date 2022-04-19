<template>
  <div id="bar" ref="bar"></div>
</template>

<script>
export default {
  name: "Bar",
  data() {
    return {
      chart: null,
      data: [
        ["week", "成交量","预计成交量"],
        ["Mon", 12,43],
        ["Tue", 15,54],
        ["Wed", 13,23],
        ["Thu", 25,22],
        ["Fri", 30],
        ["Sat", 35],
        ["Sun", 40],
      ],
      options: {
        xAxis: {
          // type: 'category'
        },
        yAxis: {
          type: 'category'
        },
        dataset:{},
        series: [
          {
            type: "bar",
            encode:{
              x:1,
              y:0
            }
          },
          {
            type:'bar',
            encode:{
              x:"预计成交量",
              y:"week"
            }
          }
        ],
        tooltip: {},
        legend: {},
      },
    };
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.bar);
    this.options.dataset.source=this.data
    this.chart.setOption(this.options);
    console.log(this.$echarts.util)
  },
};
</script>

<style scoped>
#bar {
  height: 400px;
  width: 600px;
}
</style>