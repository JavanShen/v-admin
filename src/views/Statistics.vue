<template>
    <div class="charts">
        <Bar></Bar>
        <Pie :data="fruitData"></Pie>
    </div>
</template>

<script>
import { Bar, Pie } from "@/components/statistics";

export default {
    name: "Statistics",
    components: {
        Bar,
        Pie,
    },
    data(){
        return {
            fruitData:[
                {
                    name: 'apple',
                    value: 43
                },
                {
                    name: 'orange',
                    value: 25
                },
                {
                    name: 'banana',
                    value: 30
                },
                {
                    name: 'watermelon',
                    value: 40
                },
                {
                    name: 'pear',
                    value: 50
                },
                {
                    name: 'pineapple',
                    value: 60
                }
            ]
        }
    }
};
</script>