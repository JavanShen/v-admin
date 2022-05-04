<template>
    <el-cascader :options="options" :value="regionsId" placeholder="请选择" ref="cascader" @change="handelChange">
    </el-cascader>
</template>

<script>
export default {
    name: "regions-picker",
    data() {
        return {
            options: [],
            province: [],
            city: [],
            county: [],
        }
    },
    created() {
        Promise.all([
            import("@/data/regions/province.js"),
            import("@/data/regions/city.js"),
            import("@/data/regions/county.js"),
        ]).then(res=>{
            this.province=res[0].province;
            this.city=res[1].city;
            this.county=res[2].county;
            this.options = res[0].province.map(item=>{
                return {
                    value: item.id,
                    label: item.name,
                    children: res[1].city[item.id].map(item=>{
                        let city={
                            value: item.id,
                            label: item.name,
                        }
                        if(res[2].county[item.id]){
                            city.children=res[2].county[item.id].map(item=>{
                                return {
                                    value: item.id,
                                    label: item.name,
                                }
                            })
                        }
                        return city
                    })
                }
            });
        })
    },
    model: {
        props: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: String,
            default: ''
        },
    },
    computed: {
        regionsId(){
            return this.getResgionsByName(this.value.split(' '))
        }
    },
    methods: {
        handelChange(val) {
            this.$emit("change", this.getRegionsById(val));
        },
        getRegionsById(idArr=[]) {
            let regions = []
            idArr.forEach((id,index)=>{
                if(index===0){
                    regions.push(this.city[id][0].province)
                }else if(index===1){
                    regions.push(this.county[id][0].city)
                }else if(index===2){
                    let countys=this.county[idArr[1]]
                    for(let county of countys){
                        if(county.id===id){
                            regions.push(county.name)
                            break
                        }
                    }
                }
            })
            return regions.join(' ')
        },
        getResgionsByName(nameArr=[]) {
            let regionsId=[]
            nameArr.forEach((name,index)=>{
                if(index===0){
                    let province=this.province?.find(item=>item.name===name)
                    if(province){
                        regionsId.push(province.id)
                    }
                }else if(index===1){
                    let city=this.city[regionsId[0]]?.find(item=>item.name===name)
                    if(city){
                        regionsId.push(city.id)
                    }
                }else if(index===2){
                    let county=this.county[regionsId[1]]?.find(item=>item.name===name)
                    if(county){
                        regionsId.push(county.id)
                    }
                }
            })
            return regionsId
        }
    },
}
</script>

<style scoped>
.el-cascader {
    width: 100%;
}
</style>