<template>
    <component class="link" :is="type" v-bind="info(to)">
        <slot></slot>
    </component>
</template>

<script>
import {isExternal} from '@/utils/validate';
//link组件,根据路径判断是路由还是普通链接
export default {
    name: "Link",
    props:{
        to:{
            type:String,
            required:true
        }
    },
    computed:{
        type(){
            if(isExternal(this.to)){
                return 'a';
            }
            return 'router-link';
        }
    },
    methods:{
        info(to){
            if(isExternal(to)){
                return {
                    href:to,
                    target:'_blank'
                }
            }
            return {
                to:to
            }
        }
    }
}
</script>

<style scoped>
.link{
    text-decoration: none;
    color: #333;
}
</style>