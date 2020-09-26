<template>
  <div>
    <h1>这个是根组件-{{ msg }}</h1>
    <app-foot></app-foot>
  </div>
</template>
<script>
// import '../../xx.css';
import appFoot from "./components/appFoot.vue"; //不能忽略后缀！！！
//vue的实例 导出默认成员
export default {
  data() {
    return {
      msg: "打包vue文件"
    };
  },
  components: {
    appFoot
  }
};
//scoped代表样式只作用于局部组件
</script>
<style scoped>
/*@import './../static/css/global.css'; 引入公共样式*/
h1 {
  background: #58bc58;
}
</style>