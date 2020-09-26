<template>
  <div>
    <div class="navbar">
      <!-- 导航菜单 router前面要加冒号，里面的属性值才是布尔值，否则是字符串-->
      <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item :index="item.path" v-for="item in menuList" :key="item.icon">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          path: "/home",
          icon: "el-icon-s-home",
          title: "首页"
        },
        {
          path: "/member",
          icon: "el-icon-user-solid",
          title: "会员管理"
        },
        {
          path: "/supplier",
          icon: "el-icon-s-cooperation",
          title: "供应商管理"
        },
        {
          path: "/goods",
          icon: "el-icon-s-goods",
          title: "商品管理"
        },
        {
          path: "/staff",
          icon: "el-icon-user",
          title: "员工管理"
        }
      ]
    };
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}
/* .el-menu-item {
  height: 80px;
}
.el-menu {
  background: chartreuse;
} */
</style>