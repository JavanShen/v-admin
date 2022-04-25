<template>
  <el-menu
    default-active="0"
    class="nav"
    @select="changeNav"
    :collapse="slideBarState"
  >
    <template>
      <img v-if="logo" class="logo" :src="logo" alt="暂无图片" />
      <span v-else>apine</span>
    </template>
    <slidebar-item
      v-for="(menu, index) in menus"
      :key="index"
      :menus="menu"
      :index="index.toString()"
    >
    </slidebar-item>
  </el-menu>
</template>

<script>
import logo from "@/assets/main/logo.svg";
import { mapGetters, mapState } from "vuex";
import SlidebarItem from "./SlidebarItem.vue";
export default {
  name: "SlideBar",
  components: {
    SlidebarItem,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapState(["slideBarState"]),
    ...mapGetters(["menus"]),
  },
  methods: {
    changeNav(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.nav {
  height: 100%;
  background-color: #fff;
}

.nav:not(.el-menu--collapse) {
  width: 200px;
}

.logo {
  width: 100%;
  height: 40px;
  margin: 10px auto;
}

.icon {
  margin-right: 10px;
}
</style>