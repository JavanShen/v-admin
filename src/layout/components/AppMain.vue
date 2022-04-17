<template>
    <section class="container">
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
export default {
    name:'AppMain',
}
</script>

<style scoped>
.container{
    height: 100%;
    width: 100%;
}
</style>