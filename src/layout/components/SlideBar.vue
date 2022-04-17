<template>
    <el-menu default-active="0" class="nav" @select="changeNav" :collapse="slideBarState">
        <template>
            <img v-if="logo" class="logo" :src="logo" alt="暂无图片">
            <span v-else>apine</span>
        </template>
        <el-menu-item v-for="(submenus, index) in menus"
            :index="index.toString()"
            :key="submenus.path">
            <i :class="[submenus.class]"></i>
            <span slot="title">{{submenus.name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
import logo from '@/assets/main/logo.svg';
import { mapGetters,mapState } from 'vuex';
export default {
    name: 'SlideBar',
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
</style>