<template>
    <div v-if="menus.hidden"></div>

    <el-submenu v-else-if="menus.children" :index="index">
      <template slot="title">
        <icon-svg
          v-if="icon"
          class="icon"
          :icon-class="icon"
        ></icon-svg>
        <span slot="title">{{ title }}</span>
      </template>
      <slidebar-item
        :key="menu.path"
        v-for="(menu, i) in menus.children"
        :menus="menu"
        :index="index + '-' + i"
        :base-url="path"
      ></slidebar-item>
    </el-submenu>

    <Link v-else :to="path">
      <el-menu-item :index="index" :key="path">
        <icon-svg
        v-if="icon"
        :icon-class="icon"
        class="icon"
      ></icon-svg>
        <span slot="title">{{ title }}</span>
      </el-menu-item>
    </Link>
</template>

<script>
import Link from "./Link.vue";
import {isExternal} from "@/utils/validate";

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
    baseUrl: {
      type: String,
      default: "",
    },
  },
  computed: {
    path() {
      if(isExternal(this.baseUrl)) return this.baseUrl
      if(isExternal(this.menus.path)) return this.menus.path
      return this.baseUrl+'/'+this.menus.path;
    },
    icon() {
      return this.menus.meta.icon;
    },
    title() {
      return this.menus.meta.title;
    },
  },
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}

.el-menu--collapse .icon {
  margin-right: 0;
}
</style>