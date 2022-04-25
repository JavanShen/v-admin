<template>
    <div v-if="menus.hidden"></div>
    <el-submenu v-else-if="menus.children" :index="index">
      <template slot="title">
        <icon-svg
          v-if="menus.meta.icon"
          class="icon"
          :iconClass="menus.meta.icon"
        ></icon-svg>
        <span slot="title">{{ menus.meta.title }}</span>
      </template>
      <slidebar-item
        :key="menu.path"
        v-for="(menu, i) in menus.children"
        :menus="menu"
        :index="index + '-' + i"
      ></slidebar-item>
    </el-submenu>

    <Link v-else :to="menus.path">
      <el-menu-item :index="index" :key="menus.path">
        <icon-svg
          v-if="menus.meta.icon"
          :iconClass="menus.meta.icon"
          class="icon"
        ></icon-svg>
        <span slot="title">{{ menus.meta.title }}</span>
      </el-menu-item>
    </Link>
</template>

<script>
import Link from "./Link.vue";

export default {
  name: "SlidebarItem",
  components: {
    Link,
  },
  props: {
    menus: {
      type: Object,
      required: true,
    },
    index: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log(this.menus);
  },
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}

.el-menu--collapse .icon{
  margin-right: 0;
}
</style>