export function options(data={},type='bar') {
    return {
        dataset:{
            source:data
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {},
        dataset: {},
        series: [
            {
                type: "bar",
            },
        ],
        tooltip: {},
        legend: {},
    }
}