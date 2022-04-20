<template>
    <el-menu default-active="0" class="nav" @select="changeNav" :collapse="slideBarState">
        <template>
            <img v-if="logo" class="logo" :src="logo" alt="暂无图片">
            <span v-else>apine</span>
        </template>
        <Link v-for="(submenus, index) in menus" :key=submenus.path :to="submenus.path">
            <el-menu-item :index="index.toString()">
                <!-- <i :class="[submenus.class]"></i> -->
                <icon-svg :iconClass="submenus.class" class="icon"></icon-svg>
                <span slot="title">{{submenus.name}}</span>
            </el-menu-item>
        </Link>
        
    </el-menu>
</template>

<script>
import logo from '@/assets/main/logo.svg';
import { mapGetters,mapState } from 'vuex';
import Link from './Link.vue'
export default {
    name: 'SlideBar',
    components: {
        Link,
    },
    data(){
        return{
            logo,
        }
    },
    computed: {
        ...mapState([
            'slideBarState'
        ]),
        ...mapGetters([
            'menus',
        ])
    },
    methods: {
        changeNav(index) {
            console.log(index)
        },
    },
}
</script>

<style scoped>
.nav{
    height: 100%;
    background-color: #fff;
}

.nav:not(.el-menu--collapse){
    width: 200px;
}

.logo{
    width: 100%;
    height: 40px;
    margin: 10px auto;
}

.icon{
    margin-right: 10px;
}
</style>