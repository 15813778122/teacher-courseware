<template>
  <div>
    <h1>底部内容-{{ ms }}</h1>
    <app-button></app-button>
  </div>
</template>
<script>
import appButton from "./appButton.vue";
export default {
  data() {
    return {
      ms: "我是底部"
    };
  },
  components: {
    appButton
  }
};
</script>
<style scoped>
h1 {
  font-size: 18px;
}
</style>