<template>
  <div>
    <div class="main">
      <appLink v-if="$route.meta.title != '首页' "></appLink>
      <router-view />
    </div>
  </div>
</template>

<script>
import appLink from "@/components/Link";
export default {
  data() {
    return {};
  },

  components: { appLink },

  methods: {},

  created() {},

  watch: {}
};
</script>

<style scoped>
</style>