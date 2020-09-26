<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="line">{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
//组件的二次封装
export default {
  data() {
    return {};
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  /* 投影 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
  border-left: 3px solid #31c17b;
  padding-left: 10px;
}
</style>