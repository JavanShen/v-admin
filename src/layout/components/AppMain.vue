<template>
  <section class="container">
    <transition name="el-fade-in-linear" mode="out-in">
      <keep-alive :include="['Edit']">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>