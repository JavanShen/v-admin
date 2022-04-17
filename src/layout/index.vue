<template>
    <div class="layout">
        <el-container>
            <el-aside width="auto">
                <slide-bar></slide-bar>
            </el-aside>
            <el-container>
                <el-header>
                    <nav-bar></nav-bar>
                </el-header>
                <el-main>
                    <app-main></app-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {NavBar,SlideBar, AppMain} from '@/layout/components';

export default {
    name: 'Layout',
    components: {
        NavBar,
        SlideBar,
        AppMain,
    },
}
</script>

<style scoped>
.layout{
    height: 100%;
}

.el-header{
    padding: 0;
}

.el-container{
    height: 100%;
}
</style>