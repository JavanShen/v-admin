export const options= {
    bar({data}){
        let barNum=0
        if(Array.isArray(data[0])){
            barNum=data[0].length-1
        }else{
            barNum=Object.keys(data[0]).length-1
        }

        return {
            legend: {},
            tooltip: {},
            dataset: {
                source: data
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: new Array(barNum).fill({type: 'bar'})
        }
    }
}